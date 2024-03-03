import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import * as request from 'supertest';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let user: any = {
    username: 'john2',
    fullName: 'doe',
    email: 'te2st@mail.com',
    password: 'Aa11223344@',
    phoneNumber: '+201155663335',
    dob: '2002-12-05',
  };
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(5555);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    await prisma.plan.create({
      data: {
        plan_id: 1,
        title: 'free plan',
        description: 'free plan',
        trial_period: '7 days',
        billing_frequency: 365,
        image_url: 'https://www.google.com',
        price: 0,
        currency: 'USD',
      },
    });

    await prisma.level.create({
      data: {
        level_id: 1,
        title: 'level 1',
        description: 'level 1',
        image_url: 'https://www.google.com',
      },
    });

    await request(app.getHttpServer())
      .post('/api/auth/signup')
      .send(user)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({
          status: 'success',
          data: {
            user: {
              user_id: expect.any(Number),
              full_name: user.fullName,
              username: user.username,
              dob: new Date(user.dob).toISOString(),
              bio: null,
              email: user.email,
              phone_number: user.phoneNumber,
              cover_image: null,
              image: null,
              points: 0,
              active: false,
              hashed_refresh_token: null,
              user_tag: [],
              level: {
                level_id: 1,
                title: 'level 1',
                description: 'level 1',
                image_url: 'https://www.google.com',
              },
              plan: {
                plan_id: 1,
                title: 'free plan',
                description: 'free plan',
                trial_period: '7 days',
                billing_frequency: 365,
                image_url: 'https://www.google.com',
                price: 0,
                currency: 'USD',
              },
            },
            access_token: expect.any(String),
          },
        });
        token = res.body.data.access_token;
        user = res.body.data.user;
      });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Study-Planner', () => {
    const task = {
      Title: 'task 1',
      Description: 'task 1',
      StartDate: '2025-12-05T03:00',
      DueDate: '2025-12-05T05:00',
      Status: 'HOLDING',
      Color: '#000000',
    };
    let returnedTask;

    describe('Study-Planner - Create', () => {
      const wrongTask = {
        Title: 'task 1',
        Description: 'task 1',
        StartDate: '2025-12-05T03:00',
        Status: 'HOLDING',
        Color: '#000000',
      };

      it('(POST) - create a new task - success', async () => {
        await request(app.getHttpServer())
          .post('/api/study-planner')
          .set('Authorization', `Bearer ${token}`)
          .send(task)
          .expect(201)
          .then((res) => {
            expect(res.body).toEqual({
              status: 'success',
              data: {
                ID: expect.any(Number),
                Title: task.Title,
                Description: task.Description,
                StartDate: new Date(task.StartDate).toISOString(),
                DueDate: new Date(task.DueDate).toISOString(),
                Status: task.Status,
                Color: task.Color,
              },
            });
            returnedTask = res.body.data;
          });
      });

      it('(POST) - create a new task - fail (no due date) -> wrong DTO', async () => {
        await request(app.getHttpServer())
          .post('/api/study-planner')
          .set('Authorization', `Bearer ${token}`)
          .send(wrongTask)
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage: [
                  'DueDate should not be empty',
                  'Invalid date format. Must be in the format yyyy-mm-ddThh:mm',
                ],
              },
            });
          });
      });

      it('(POST) - create a new task - fail (no token) -> access denied', async () => {
        await request(app.getHttpServer())
          .post('/api/study-planner')
          .send(task)
          .expect(401)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage: 'Unauthorized',
              },
            });
          });
      });
    });

    describe('Study-Planner - Get', () => {
      describe('GET Many', () => {
        it('(GET) - get all tasks', async () => {
          await request(app.getHttpServer())
            .get('/api/study-planner')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                status: 'success',
                data: [returnedTask],
              });
            });
        });

        it('(GET) - get many tasks - with pagination', async () => {
          await request(app.getHttpServer())
            .get('/api/study-planner?offset=0&limit=6')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                status: 'success',
                data: [returnedTask],
              });
            });
        });

        it('(GET) - get many tasks - fail (wrong pagination limit)', async () => {
          await request(app.getHttpServer())
            .get('/api/study-planner?offset=0&limit=-1')
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
            .then((res) => {
              expect(res.body).toEqual({
                data: {
                  errorMessage: ['limit must be a positive number'],
                },
              });
            });
        });

        it('(GET) - get many tasks - fail (no token) access denied', async () => {
          await request(app.getHttpServer())
            .get('/api/study-planner?offset=0&limit=1')
            .expect(401)
            .then((res) => {
              expect(res.body).toEqual({
                data: {
                  errorMessage: 'Unauthorized',
                },
              });
            });
        });
      });

      describe('GET One', () => {
        it('(GET) - get a task by ID', async () => {
          await request(app.getHttpServer())
            .get(`/api/study-planner/${returnedTask.ID}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                status: 'success',
                data: returnedTask,
              });
            });
        });

        it('(GET) - get a task by ID - fail (id does not exist)', async () => {
          await request(app.getHttpServer())
            .get(`/api/study-planner/${returnedTask.ID + 5}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)
            .then((res) => {
              expect(res.body).toEqual({
                data: {
                  errorMessage: 'Task not found',
                },
              });
            });
        });

        it('(GET) - get a task by ID - fail (wrong id format)', async () => {
          await request(app.getHttpServer())
            .get(`/api/study-planner/${returnedTask.ID + 5}s`)
            .set('Authorization', `Bearer ${token}`)
            .expect(406)
            .then((res) => {
              expect(res.body).toEqual({
                data: {
                  errorMessage:
                    'Validation failed (numeric string is expected)',
                },
              });
            });
        });

        it('(GET) - get a task by ID - fail (no token) access denied', async () => {
          await request(app.getHttpServer())
            .get(`/api/study-planner/${returnedTask.ID}`)
            .expect(401)
            .then((res) => {
              expect(res.body).toEqual({
                data: {
                  errorMessage: 'Unauthorized',
                },
              });
            });
        });
      });
    });

    describe('Study-Planner - Update', () => {
      it('(PATCH) - update a task by ID - Title and Description', async () => {
        const updatedTask = {
          Title: 'task 1 updated',
          Description: 'task 1 updated',
          StartDate: '2025-12-05T06:00',
          DueDate: '2025-12-05T07:00',
          Status: 'HOLDING',
          Color: '#000000',
        };

        await request(app.getHttpServer())
          .patch(`/api/study-planner/${returnedTask.ID}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedTask)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              status: 'success',
              data: {
                ID: returnedTask.ID,
                Title: updatedTask.Title,
                Description: updatedTask.Description,
                StartDate: new Date(updatedTask.StartDate).toISOString(),
                DueDate: new Date(updatedTask.DueDate).toISOString(),
                Status: updatedTask.Status,
                Color: updatedTask.Color,
              },
            });
            returnedTask = res.body.data;
          });
      });

      it('(PATCH) - update a task by ID - Title and Description', async () => {
        const updatedTask = {
          Title: 'task 1 updated',
          Description: 'task 1 updated',
        };

        await request(app.getHttpServer())
          .patch(`/api/study-planner/${returnedTask.ID}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedTask)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              status: 'success',
              data: {
                ID: returnedTask.ID,
                Title: updatedTask.Title,
                Description: updatedTask.Description,
                StartDate: new Date(returnedTask.StartDate).toISOString(),
                DueDate: new Date(returnedTask.DueDate).toISOString(),
                Status: returnedTask.Status,
                Color: returnedTask.Color,
              },
            });
            returnedTask = res.body.data;
          });
      });

      it('(PATCH) - update a task by ID - Dates only', async () => {
        const updatedTask = {
          StartDate: '2025-12-05T08:00',
          DueDate: '2025-12-05T10:00',
        };

        await request(app.getHttpServer())
          .patch(`/api/study-planner/${returnedTask.ID}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedTask)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              status: 'success',
              data: {
                ID: returnedTask.ID,
                Title: returnedTask.Title,
                Description: returnedTask.Description,
                StartDate: new Date(updatedTask.StartDate).toISOString(),
                DueDate: new Date(updatedTask.DueDate).toISOString(),
                Status: returnedTask.Status,
                Color: returnedTask.Color,
              },
            });
          });
      });

      it('(PATCH) - update a task by ID - success with no updates', async () => {
        const updatedTask = {};

        await request(app.getHttpServer())
          .patch(`/api/study-planner/${returnedTask.ID}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedTask)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              status: 'success',
              data: {
                Color: '#000000',
                Description: 'task 1 updated',
                DueDate: '2025-12-05T08:00:00.000Z',
                ID: returnedTask.ID,
                StartDate: '2025-12-05T06:00:00.000Z',
                Status: 'HOLDING',
                Title: 'task 1 updated',
              },
            });
          });
      });

      it('(PATCH) - update a task by ID - Dates only - fail (only start date provided)', async () => {
        const updatedTask = {
          StartDate: '2025-12-05T08:00',
        };

        await request(app.getHttpServer())
          .patch(`/api/study-planner/${returnedTask.ID}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedTask)
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage:
                  'when some date is to be updated, the other must be provided',
              },
            });
          });
      });

      it('(PATCH) - update a task by ID - Dates only - fail (only due date provided)', async () => {
        const updatedTask = {
          DueDate: '2025-12-05T08:00',
        };

        await request(app.getHttpServer())
          .patch(`/api/study-planner/${returnedTask.ID}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedTask)
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage:
                  'when some date is to be updated, the other must be provided',
              },
            });
          });
      });

      it('(PATCH) - update a task by ID - fail (no token) access denied', async () => {
        const updatedTask = {
          StartDate: '2025-12-05T08:00',
          DueDate: '2025-12-05T10:00',
        };

        await request(app.getHttpServer())
          .patch(`/api/study-planner/${returnedTask.ID}`)
          .send(updatedTask)
          .expect(401)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage: 'Unauthorized',
              },
            });
          });
      });
    });

    describe('Study-Planner - Delete', () => {
      it('(DELETE) - delete a task by ID', async () => {
        await request(app.getHttpServer())
          .delete(`/api/study-planner/${returnedTask.ID}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              status: 'success',
              data: true,
            });
          });
      });

      it('(DELETE) - delete a task by ID - fail (id does not exist)', async () => {
        await request(app.getHttpServer())
          .delete(`/api/study-planner/${returnedTask.ID + 5}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage: "Task doesn't exist",
              },
            });
          });
      });

      it('(DELETE) - delete a task by ID - fail (no token) access denied', async () => {
        await request(app.getHttpServer())
          .delete(`/api/study-planner/${returnedTask.ID}`)
          .expect(401)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage: 'Unauthorized',
              },
            });
          });
      });
    });
  });

  describe('Articles', () => {
    const article = {
      title: 'My article title',
      coverImageUrl: 'www.google.com/url/to/image.jpg',
      tags: ['tag1', 'tag2', 'tag3'],
      sections: [
        ['section1', 'image'],
        ['section2', 'text'],
      ],
    };

    let returnedArticle;

    describe('Articles - Create', () => {
      const wrongArticle = {
        title: 'My article',
        tags: ['tag1', 'tag2', 'tag3'],
        sections: [
          ['section1', 'image'],
          ['section2', 'text'],
        ],
      };

      it('(POST) - create a new article', async () => {
        await request(app.getHttpServer())
          .post('/api/articles')
          .set('Authorization', `Bearer ${token}`)
          .send(article)
          .expect(201)
          .then((res) => {
            expect(res.body).toEqual({
              status: 'success',
              data: {
                ID: expect.any(Number),
                title: article.title,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                coverImageUrl: article.coverImageUrl,
                tags: article.tags,
                author: {
                  fullName: user.full_name,
                  username: user.username,
                  image: user.image,
                },
                sections: [
                  {
                    value: article.sections[0][0],
                    contentType: article.sections[0][1],
                  },
                  {
                    value: article.sections[1][0],
                    contentType: article.sections[1][1],
                  },
                ],
              },
            });
            returnedArticle = res.body.data;
          });
      });

      it('(POST) - create a new article - fail (wrong DTO)', async () => {
        await request(app.getHttpServer())
          .post('/api/articles')
          .set('Authorization', `Bearer ${token}`)
          .send(wrongArticle)
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage: [
                  'coverImageUrl should not be empty',
                  'coverImageUrl must be a URL address',
                ],
              },
            });
          });
      });

      it('(POST) - create a new article - fail (no token) access denied', async () => {
        await request(app.getHttpServer())
          .post('/api/articles')
          .send(article)
          .expect(401)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage: 'Unauthorized',
              },
            });
          });
      });
    });

    describe('Articles - Get', () => {
      describe('GET Many', () => {
        it('(GET) - get all articles', async () => {
          await request(app.getHttpServer())
            .get('/api/articles')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                status: 'success',
                data: [returnedArticle],
              });
            });
        });

        it('(GET) - get many articles - with pagination', async () => {
          await request(app.getHttpServer())
            .get('/api/articles?offset=0&limit=2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                status: 'success',
                data: [returnedArticle],
              });
            });
        });

        it('(GET) - get many articles - success with no authorization ', async () => {
          await request(app.getHttpServer())
            .get('/api/articles?offset=0&limit=2')
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                data: {
                  status: 'success',
                  data: [returnedArticle],
                },
              });
            });
        });
      });

      describe('GET One', () => {
        it('(GET) - get an article by ID', async () => {
          await request(app.getHttpServer())
            .get(`/api/articles/${returnedArticle.ID}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
              expect(res.body).toEqual({
                status: 'success',
                data: returnedArticle,
              });
            });
        });

        it('(GET) - get an article by ID - fail (id does not exist)', async () => {
          await request(app.getHttpServer())
            .get(`/api/articles/${returnedArticle.ID + 5}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)
            .then((res) => {
              expect(res.body).toEqual({
                data: {
                  errorMessage: 'Article not found',
                },
              });
            });
        });

        it('(GET) - get an article by ID - fail (wrong id format)', async () => {
          await request(app.getHttpServer())
            .get(`/api/articles/${returnedArticle.ID}ss`)
            .expect(400)
            .then((res) => {
              expect(res.body).toEqual({
                data: {
                  errorMessage: [
                    'articleId must be a number conforming to the specified constraints',
                  ],
                },
              });
            });
        });
      });
    });

    describe('Articles - Update', () => {
      let updatedArticle;
      it('(PATCH) - update an article by ID - title', async () => {
        const updatedArticleData = {
          title: 'My article title updated',
        };

        await request(app.getHttpServer())
          .patch(`/api/articles/${returnedArticle.ID}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedArticleData)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              status: 'success',
              data: {
                ID: expect.any(Number),
                title: updatedArticleData.title,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                coverImageUrl: article.coverImageUrl,
                tags: article.tags,
                author: {
                  fullName: user.full_name,
                  username: user.username,
                  image: user.image,
                },
                sections: [
                  {
                    value: article.sections[0][0],
                    contentType: article.sections[0][1],
                  },
                  {
                    value: article.sections[1][0],
                    contentType: article.sections[1][1],
                  },
                ],
              },
            });
            updatedArticle = res.body.data;
          });
      });

      it('(PATCH) - update an article by ID - tags', async () => {
        const updateArticleData = {
          addedTags: ['tag4', 'tag5'],
        };

        await request(app.getHttpServer())
          .patch(`/api/articles/${updatedArticle.ID}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updateArticleData)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              status: 'success',
              data: {
                ID: expect.any(Number),
                title: updatedArticle.title,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                coverImageUrl: article.coverImageUrl,
                tags: [
                  ...returnedArticle.tags,
                  ...updateArticleData.addedTags,
                ].filter((a) => {
                  return (
                    updateArticleData.addedTags.indexOf(a) ===
                    updateArticleData.addedTags.lastIndexOf(a)
                  );
                }),
                author: {
                  fullName: user.full_name,
                  username: user.username,
                  image: user.image,
                },
                sections: [
                  {
                    value: article.sections[0][0],
                    contentType: article.sections[0][1],
                  },
                  {
                    value: article.sections[1][0],
                    contentType: article.sections[1][1],
                  },
                ],
              },
            });
          });
      });

      it('(PATCH) - update an article by ID - fail (no token) access denied', async () => {
        await request(app.getHttpServer())
          .patch(`/api/articles/${updatedArticle.ID}`)
          .expect(401)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage: 'Unauthorized',
              },
            });
          });
      });
    });

    describe('Articles - Delete', () => {
      it('(DELETE) - delete an article by ID', async () => {
        await request(app.getHttpServer())
          .delete(`/api/articles/${returnedArticle.ID}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              status: 'success',
              data: true,
            });
          });
      });

      it('(DELETE) - delete an article by ID - fail (id is not numeric string)', async () => {
        await request(app.getHttpServer())
          .delete(`/api/articles/${returnedArticle.ID}sss`)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage: [
                  'articleId must be a number conforming to the specified constraints',
                ],
              },
            });
          });
      });

      it('(DELETE) - delete an article by ID - fail (id does not exist)', async () => {
        await request(app.getHttpServer())
          .delete(`/api/articles/${returnedArticle.ID + 5}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage:
                  'An operation failed because it depends on one or more records that were required but not found.',
              },
            });
          });
      });

      it('(DELETE) - delete an article by ID - fail (no token) access denied', async () => {
        await request(app.getHttpServer())
          .delete(`/api/articles/${returnedArticle.ID}`)
          .expect(401)
          .then((res) => {
            expect(res.body).toEqual({
              data: {
                errorMessage: 'Unauthorized',
              },
            });
          });
      });
    });
  });
});
