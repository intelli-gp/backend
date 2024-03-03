import { Test, TestingModule } from '@nestjs/testing';
import { StudyPlannerService } from './study-planner.service';
import { PrismaService } from '../prisma/prisma.service';

describe('StudyPlannerService', () => {
  let studyPlannerService: StudyPlannerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const commonTasks = [
      {
        id: 1,
        title: 'My study planner title 1',
        description: 'My study planner description 1',
        start_date: new Date('2025-02-19T12:00'),
        due_date: new Date('2025-02-19T14:00'),
        status: 'IN_PROGRESS',
        color: '#ffffff',
      },
      {
        id: 2,
        title: 'My study planner title 2',
        description: 'My study planner description 2',
        start_date: new Date('2025-02-19T15:00'),
        due_date: new Date('2025-02-19T18:00'),
        status: 'IN_PROGRESS',
        color: '#ffffff',
      },
      {
        id: 3,
        title: 'My study planner title 3',
        description: 'My study planner description',
        start_date: new Date('2025-02-20T12:00'),
        due_date: new Date('2025-02-20T13:00'),
        status: 'IN_PROGRESS',
        color: '#ffffff',
      },
    ];
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudyPlannerService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              create: jest.fn().mockResolvedValue({
                ...commonTasks[0],
                start_date: new Date('2025-02-21T12:00'),
                due_date: new Date('2025-02-21T14:00'),
              }),
              findMany: jest.fn().mockResolvedValue(commonTasks),
              findUnique: jest.fn().mockResolvedValue(commonTasks[1]),
              update: jest.fn().mockImplementation((updateData) => {
                const updatedData = { ...commonTasks[1], ...updateData.data };
                return Promise.resolve(updatedData);
              }),
              delete: jest.fn().mockResolvedValue(true),
            },
          },
        },
      ],
    }).compile();

    studyPlannerService = module.get<StudyPlannerService>(StudyPlannerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create a task', () => {
    it('should create a task', async () => {
      const task = await studyPlannerService.createTask(1, {
        Title: 'My study planner title 1',
        Description: 'My study planner description 1',
        StartDate: '2025-02-21T12:00',
        DueDate: '2025-02-21T14:00',
        Status: 'IN_PROGRESS',
        Color: '#ffffff',
      });

      expect(prismaService.task.create).toHaveBeenCalledWith({
        data: {
          user_id: 1,
          title: 'My study planner title 1',
          description: 'My study planner description 1',
          start_date: new Date('2025-02-21T12:00'),
          due_date: new Date('2025-02-21T14:00'),
          status: 'IN_PROGRESS',
          color: '#ffffff',
        },
      });
    });
  });

  describe('get all tasks', () => {
    it('should return all tasks', async () => {
      const tasks = await studyPlannerService.getTasks(1, {
        limit: 10,
        offset: 0,
      });

      expect(prismaService.task.findMany).toHaveBeenCalledWith({
        where: { user_id: 1 },
        take: 10,
        skip: 0,
      });
    });
  });

  describe('get a task', () => {
    it('should return a task', async () => {
      const task = await studyPlannerService.getTask(1, 2);

      expect(prismaService.task.findUnique).toHaveBeenCalledWith({
        where: { task_id: 2, user_id: 1 },
      });

      expect(task).toEqual({
        id: 2,
        title: 'My study planner title 2',
        description: 'My study planner description 2',
        start_date: new Date('2025-02-19T15:00'),
        due_date: new Date('2025-02-19T18:00'),
        status: 'IN_PROGRESS',
        color: '#ffffff',
      });
    });
  });

  describe('update a task', () => {
    it('should update a task, all data', async () => {
      const task = await studyPlannerService.updateTask(1, 2, {
        Title: 'My study planner title 2 updated',
        Description: 'My study planner description 2 updated',
        StartDate: '2025-02-20T15:00',
        DueDate: '2025-02-20T18:00',
        Status: 'IN_PROGRESS',
        Color: '#aaaaaa',
      });

      expect(prismaService.task.update).toHaveBeenCalledWith({
        where: { task_id: 2, user_id: 1 },
        data: {
          title: 'My study planner title 2 updated',
          description: 'My study planner description 2 updated',
          start_date: new Date('2025-02-20T15:00'),
          due_date: new Date('2025-02-20T18:00'),
          status: 'IN_PROGRESS',
          color: '#aaaaaa',
        },
      });

      expect(task).toEqual({
        id: 2,
        title: 'My study planner title 2 updated',
        description: 'My study planner description 2 updated',
        start_date: new Date('2025-02-20T15:00'),
        due_date: new Date('2025-02-20T18:00'),
        status: 'IN_PROGRESS',
        color: '#aaaaaa',
      });
    });

    it('should update a task, title and description', async () => {
      const task = await studyPlannerService.updateTask(1, 2, {
        Title: 'My study planner title 2 updated',
        Description: 'My study planner description 2 updated',
        StartDate: null,
        DueDate: null,
        Status: null,
        Color: null,
      });

      expect(prismaService.task.update).toHaveBeenCalledWith({
        where: { task_id: 2, user_id: 1 },
        data: {
          title: 'My study planner title 2 updated',
          description: 'My study planner description 2 updated',
        },
      });

      expect(task).toEqual({
        id: 2,
        title: 'My study planner title 2 updated',
        description: 'My study planner description 2 updated',
        start_date: new Date('2025-02-19T15:00'),
        due_date: new Date('2025-02-19T18:00'),
        status: 'IN_PROGRESS',
        color: '#ffffff',
      });
    });

    it('should update a task, dates', async () => {
      const task = await studyPlannerService.updateTask(1, 2, {
        Title: null,
        Description: null,
        StartDate: '2025-02-24T15:00',
        DueDate: '2025-02-24T18:00',
        Status: null,
        Color: null,
      });

      expect(prismaService.task.update).toHaveBeenCalledWith({
        where: { task_id: 2, user_id: 1 },
        data: {
          start_date: new Date('2025-02-24T15:00'),
          due_date: new Date('2025-02-24T18:00'),
        },
      });

      expect(task).toEqual({
        id: 2,
        title: 'My study planner title 2',
        description: 'My study planner description 2',
        start_date: new Date('2025-02-24T15:00'),
        due_date: new Date('2025-02-24T18:00'),
        status: 'IN_PROGRESS',
        color: '#ffffff',
      });
    });
  });

  describe('delete a task', () => {
    it('should delete a task', async () => {
      const isDeleted = await studyPlannerService.deleteTask(1, 2);

      expect(prismaService.task.delete).toHaveBeenCalledWith({
        where: { task_id: 2, user_id: 1 },
      });

      expect(isDeleted).toBe(true);
    });
  });
});
