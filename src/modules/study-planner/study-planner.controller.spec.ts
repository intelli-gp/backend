import { Test, TestingModule } from '@nestjs/testing';
import { StudyPlannerController } from './study-planner.controller';

describe('StudyPlannerController', () => {
  let controller: StudyPlannerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyPlannerController],
    }).compile();

    controller = module.get<StudyPlannerController>(StudyPlannerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
