import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PointsDto } from './dto/points.dto';
import { BadgeDto, UserBadgeDto } from './dto/badges.dto';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class GamificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async changePoints(id: number, PointsDto: PointsDto) {
    const { Points } = PointsDto;

    const updatedUser = await this.prismaService
      .$transaction(async (prisma) => {
        if (Points < 0) await this.checkPoints(id, Points, prisma);

        const user = await prisma.user
          .update({
            where: { user_id: id },
            data: { points: { increment: Points } },
          })
          .catch((err) => {
            if (err.code.startsWith('P2')) throw new err();
          });
        return user;
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return updatedUser;
  }

  async addBadge(badgeDto: BadgeDto) {
    const badge = await this.prismaService.badges.create({
      data: {
        title: badgeDto.Title,
        description: badgeDto.Description,
        image_url: badgeDto.ImageUrl,
        required_points: badgeDto.RequiredPoints,
      },
    });

    return badge;
  }

  async addUserBadge(userId: number, badgeDto: UserBadgeDto) {
    const badge = await this.prismaService.$transaction(async (prisma) => {
      await this.checkBadge(userId, badgeDto.BadgeId, prisma);

      const badge = await prisma.user_badge
        .create({
          data: {
            user_id: userId,
            badge_id: badgeDto.BadgeId,
            unlock_date: new Date(),
          },
        })
        .catch((err) => {
          throw new BadRequestException(err);
        });

      return badge;
    });

    return badge;
  }

  getLeaderboard(pagination: PaginationDto) {
    if (pagination && pagination.limit && pagination.offset > -1) {
      return this.prismaService.user.findMany({
        orderBy: { points: 'desc' },
        take: pagination.limit,
        skip: pagination.offset,
      });
    } else
      return this.prismaService.user.findMany({ orderBy: { points: 'desc' } });
  }

  private async checkBadge(user_id: number, badge_id: number, prisma) {
    const badge = await prisma.badges.findUnique({
      where: { badge_id },
    });

    if (!badge) throw new BadRequestException('no badge with this id');

    const userBadge = await prisma.user_badge.findUnique({
      where: { user_id_badge_id: { user_id: user_id, badge_id } },
    });
    console.log(userBadge);

    if (userBadge) throw new BadRequestException('user already has this badge');

    return true;
  }

  private async checkPoints(id: number, points: number, prisma) {
    const user = await prisma.user.findUnique({
      where: { user_id: id },
      select: { points: true },
    });
    if (Math.abs(points) > user.points) {
      throw new BadRequestException(
        'user total poitns are less than the points you want to removed',
      );
    }
  }
}
