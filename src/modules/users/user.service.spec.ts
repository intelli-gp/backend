import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';
import { TagsService } from '../tags/tags.service';

describe('UsersServiceTest', () => {
  let usersService: UsersService;
  let prismaService: DeepMocked<PrismaService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: createMock<PrismaService>({
            user_follower: {
              findMany: jest.fn().mockReturnValue([
                {
                  username: 'username1',
                  full_name: 'full_name',
                  image: 'image',
                },
                {
                  username: 'username2',
                  full_name: 'full_name',
                  image: 'image',
                },
                {
                  username: 'username3',
                  full_name: 'full_name',
                  image: 'image',
                },
              ]),
              create: jest.fn().mockReturnValue(true),
              delete: jest.fn().mockReturnValue(true),
            },
          }),
        },
        {
          provide: TagsService,
          useValue: createMock<TagsService>(),
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get(PrismaService);
  });

  describe('follow user', () => {
    it('should follow user successfully', async () => {
      const userId = 1;
      const userToFollowId = 2;

      const result = await usersService.followUser(userId, userToFollowId);

      expect(prismaService.user_follower.create).toHaveBeenCalledWith({
        data: {
          user_id: userToFollowId,
          follower_id: userId,
        },
      });

      expect(result).toEqual(true);
    });
  });

  describe('unfollow user', () => {
    it('should unfollow user successfully', async () => {
      const userId = 1;
      const userToUnfollowId = 2;

      const result = await usersService.unfollowUser(userId, userToUnfollowId);

      expect(prismaService.user_follower.delete).toHaveBeenCalledWith({
        where: {
          user_id_follower_id: {
            user_id: userToUnfollowId,
            follower_id: userId,
          },
        },
      });

      expect(result).toEqual(true);
    });
  });

  describe('get user followers', () => {
    it('should get user followers successfully', async () => {
      const userId = 1;

      const result = await usersService.getUserFollowers(userId, {
        limit: 10,
        offset: 0,
      });

      expect(prismaService.user_follower.findMany).toHaveBeenCalledWith({
        where: { user_id: userId },
        take: 10,
        skip: 0,
        select: {
          follower: {
            select: {
              username: true,
              full_name: true,
              image: true,
            },
          },
        },
      });
      console.log(result);
      expect(result).toEqual([
        {
          username: 'username1',
          full_name: 'full_name',
          image: 'image',
        },
        {
          username: 'username2',
          full_name: 'full_name',
          image: 'image',
        },
        {
          username: 'username3',
          full_name: 'full_name',
          image: 'image',
        },
      ]);
    });
  });

  describe('get user following', () => {
    it('should get user following successfully', async () => {
      const userId = 1;

      const result = await usersService.getUserFollowing(userId, {
        limit: 10,
        offset: 0,
      });

      expect(prismaService.user_follower.findMany).toHaveBeenCalledWith({
        where: { follower_id: userId },
        take: 10,
        skip: 0,
        select: {
          user: {
            select: {
              username: true,
              full_name: true,
              image: true,
            },
          },
        },
      });

      expect(result).toEqual([
        {
          username: 'username1',
          full_name: 'full_name',
          image: 'image',
        },
        {
          username: 'username2',
          full_name: 'full_name',
          image: 'image',
        },
        {
          username: 'username3',
          full_name: 'full_name',
          image: 'image',
        },
      ]);
    });
  });
});
