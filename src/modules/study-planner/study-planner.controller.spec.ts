import { Test, TestingModule } from '@nestjs/testing';
import { StudyPlannerController } from './study-planner.controller';
import { StudyPlannerService } from './study-planner.service';
import { SerializedTask } from './serialized-types/serialized-task';

describe('StudyPlannerController', () => {
  let controller: StudyPlannerController;

  let requestMock = {
    headers: {
      authorization:
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJFbWFpbCI6ImFiZG9uYXNzZXI4NjU1NUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0MzQ3NTQsImV4cCI6MTcwOTAyNjc1NH0.CnsI0w7DywQdMcLaLwFBe7e8okQKca-qsvpPmP4fPxQ',
    },
    body: {
      Title: 'test 1',
      Description: 'this is a test task',
      Status: 'Waiting',
      StartDate: '2024-02-01T18:00',
      DueDate: '2024-02-01T19:00',
    },
    query: {
      offset: 1,
      limit: 10,
    },
  };

  const successResponseMock = {
    status: 'success',
    data: [
      {
        ID: 1,
        Title: 'test 1',
        Description: 'this is a test task',
        Status: 'Waiting',
        StartDate: new Date('2024-02-01T18:00'),
        DueDate: new Date('2024-02-01T19:00'),
      },
    ],
  };

  const mockStudyPlannerService = {
    getTasks: jest.fn(() => {
      return [
        {
          task_id: 1,
          title: 'test 1',
          description: 'this is a test task',
          status: 'Waiting',
          start_date: new Date('2024-02-01T18:00'),
          due_date: new Date('2024-02-01T19:00'),
        },
      ];
    }),

    getTaskById: jest.fn(() => []),
    createTask: jest.fn(() => []),
    updateTask: jest.fn(() => []),
    deleteTask: jest.fn(() => []),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyPlannerController],
      providers: [StudyPlannerService],
    })
      .overrideProvider(StudyPlannerService)
      .useValue(mockStudyPlannerService)
      .compile();

    controller = module.get<StudyPlannerController>(StudyPlannerController);
  });

  describe('getTasks', () => {
    it('should return all existing tasks in the database related to a certain user', async () => {
      expect(await controller.getTasks(2, requestMock.query)).toEqual(
        successResponseMock,
      );
    });
  });
});
