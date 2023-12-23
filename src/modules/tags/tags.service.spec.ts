import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { PrismaService } from '../prisma/prisma.service';
import exp from 'constants';

describe('TagsServiceTest', () => {
  let tagsService: TagsService;
  let prismaService: DeepMocked<PrismaService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: PrismaService,
          useValue: createMock<PrismaService>({
            tag: {
              findMany: jest.fn().mockReturnValue([{ tag_name: 'tag1' }]),
            },
            user_tag: {
              findMany: jest.fn().mockReturnValue([
                { tag_name: 'tag1', user_id: 1 },
                { tag_name: 'tag1', user_id: 2 },
                { tag_name: 'tag1', user_id: 3 },
                { tag_name: 'tag2', user_id: 1 },
                { tag_name: 'tag3', user_id: 2 },
              ]),
            },
          }),
        },
      ],
    }).compile();

    tagsService = module.get<TagsService>(TagsService);
    prismaService = module.get(PrismaService);
  });

  describe('get all tags', () => {
    it('should get all tags', async () => {
      const paginationData = {
        limit: 10,
        offset: 1,
      };
      await tagsService.getAllTags(paginationData);
      expect(prismaService.tag.findMany).toHaveBeenCalledWith({
        take: paginationData.limit,
        skip: paginationData.offset,
      });
    });
  });
  describe('get suggested tags', () => {
    it('should get suggested tags with pagination data', async () => {
      const paginationData = {
        limit: 10,
        offset: 1,
      };
      const result = await tagsService.getSuggestedTags(paginationData);
      expect(prismaService.user_tag.findMany).toHaveBeenCalled();

      // expect array containing string
      expect(result).toEqual(expect.arrayContaining([expect.any(String)]));
    });
  });
});
