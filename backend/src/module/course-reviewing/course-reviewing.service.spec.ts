import { Test, TestingModule } from '@nestjs/testing';
import { CourseReviewingService } from './course-reviewing.service';

describe('CourseReviewingService', () => {
  let service: CourseReviewingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseReviewingService],
    }).compile();

    service = module.get<CourseReviewingService>(CourseReviewingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
