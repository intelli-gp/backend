import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../prisma/prisma.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { TagsService } from '../tags/tags.service';

describe('ArticlesService', () => {
  let articlesService: ArticlesService;
  let prismaService: DeepMocked<PrismaService>;
  let tagsService: DeepMocked<TagsService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: PrismaService,
          useValue: createMock<PrismaService>({
            article: {
              create: jest.fn().mockReturnValue({
                article_id: 1,
                title: 'My article title',
                cover_image_url: 'www.google.com/url/to/image.jpg',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: 1,
              }),
              findUnique: jest.fn().mockReturnValue({
                article_id: 1,
                title: 'My article title',
                cover_image_url: 'www.google.com/url/to/image.jpg',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: 1,
              }),
              delete: jest.fn().mockReturnValue(true),
            },
          }),
        },
        {
          provide: TagsService,
          useValue: createMock<TagsService>({
            addTagsForEntities: jest.fn().mockReturnValue([
              {
                tag_name: 'tag1',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                tag_name: 'tag2',
                created_at: new Date(),
                updated_at: new Date(),
              },
              {
                tag_name: 'tag3',
                created_at: new Date(),
                updated_at: new Date(),
              },
            ]),
          }),
        },
      ],
    }).compile();

    articlesService = module.get<ArticlesService>(ArticlesService);
    tagsService = module.get(TagsService);
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
      const articleId = 1;
      const now = new Date();

      const addedArticle = await articlesService.createArticle(
        articleData,
        userId,
      );

      expect(prismaService.article.create).toHaveBeenCalledWith({
        data: {
          title: 'My article title',
          cover_image_url: 'www.google.com/url/to/image.jpg',
          user_id: 1,
          created_at: now,
          articles_content: {
            createMany: {
              data: [
                {
                  value: 'valueOfSection1',
                  content_type: 'typeOfSection1',
                  created_at: now,
                },
                {
                  value: 'valueOfSection2',
                  content_type: 'typeOfSection2',
                  created_at: now,
                },
              ],
            },
          },
        },
        include: {
          article_tag: true,
          user: true,
          articles_content: true,
        },
      });

      expect(tagsService.addTagsForEntities).toHaveBeenCalledWith(
        articleData.tags,
        'article',
        articleId,
      );
      // TODO: may check the returned schema
    });
  });

  describe('get article', () => {
    it('should get article successfully', async () => {
      const articleId = 1;

      await articlesService.getArticle(articleId);

      expect(prismaService.article.findUnique).toHaveBeenCalledWith({
        where: {
          article_id: articleId,
        },
        include: {
          article_tag: true,
          user: true,
          articles_content: true,
        },
      });
    });

    describe('delete article', () => {
      it('should delete article successfully', async () => {
        const articleId = 1;
        const userId = 1;

        const isDeleted = await articlesService.deleteArticle(
          articleId,
          userId,
        );

        expect(prismaService.article.delete).toHaveBeenCalledWith({
          where: {
            article_id: articleId,
            user_id: userId,
          },
        });

        expect(isDeleted).toBe(true);
      });
    });
  });
});
