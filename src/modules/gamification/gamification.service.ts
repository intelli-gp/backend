import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PointsDto } from './dto/points.dto';

@Injectable()
export class GamificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async changePoints(id: number, PointsDto: PointsDto) {
    const { points } = PointsDto;

    const updatedUser = await this.prismaService
      .$transaction(async (prisma) => {
        if (points < 0) await this.checkPoints(id, points, prisma);

        const user = await prisma.user
          .update({
            where: { user_id: id },
            data: { points: { increment: points } },
          })
          .catch((err) => {
            throw new BadRequestException(err);
          });
        return user;
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return updatedUser;
  }

  async 


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
