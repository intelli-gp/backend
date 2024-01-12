import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../prisma/prisma.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';

describe('ArticlesService', () => {
  let articlesService: ArticlesService;
  let prismaService: DeepMocked<PrismaService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: PrismaService,
          useValue: createMock<PrismaService>({
            article: {
              create: jest.fn().mockReturnValue([
                {
                  article_id: 1,
                  title: 'My article title',
                  cover_image_url: 'www.google.com/url/to/image.jpg',
                  created_at: new Date(),
                  updated_at: new Date(),
                  user_id: 1,
                },
                {
                  article_id: 2,
                  title: 'My article title',
                  cover_image_url: 'www.google.com/url/to/image.jpg',
                  created_at: new Date(),
                  updated_at: new Date(),
                  user_id: 1,
                },
              ]),
            },
          }),
        },
      ],
    }).compile();

    articlesService = module.get<ArticlesService>(ArticlesService);
    prismaService = module.get(PrismaService);
  });

  describe('create article', () => {
    it('should create article successfully', async () => {
      const articleData = {
        title: 'My article title',
        coverImageUrl: 'www.google.com/url/to/image.jpg',
        tags: ['tag1', 'tag2', 'tag3'],
        sections: [
          ['valueOfSection1', 'typeOfSection1'],
          ['valueOfSection2', 'typeOfSection2'],
        ],
      };
      const userId = 1;
      const addedArticle = await articlesService.createArticle(
        articleData,
        userId,
      );
      const sectionsPayload = [
        {
          value: 'valueOfSection1',
          content_type: 'typeOfSection1',
          created_at: new Date(),
        },
        {
          value: 'valueOfSection2',
          content_type: 'typeOfSection2',
          created_at: new Date(),
        },
      ];
      expect(prismaService.article.create).toHaveBeenCalledWith({
        data: {
          title: 'My article title',
          cover_image_url: 'www.google.com/url/to/image.jpg',
          user_id: 1,
          created_at: new Date(),
          articles_content: {
            createMany: {
              data: sectionsPayload,
            },
          },
        },
      });

      expect(addedArticle).toBe(true);
    });
  });
});
