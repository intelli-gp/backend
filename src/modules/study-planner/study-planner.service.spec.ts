import { Test, TestingModule } from '@nestjs/testing';
import { StudyPlannerService } from './study-planner.service';

describe('StudyPlannerService', () => {
    let service: StudyPlannerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StudyPlannerService],
        }).compile();

        service = module.get<StudyPlannerService>(StudyPlannerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
