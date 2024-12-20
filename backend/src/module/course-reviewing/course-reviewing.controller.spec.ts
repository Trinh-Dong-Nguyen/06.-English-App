import { Test, TestingModule } from '@nestjs/testing';
import { CourseReviewingController } from './course-reviewing.controller';
import { CourseReviewingService } from './course-reviewing.service';

describe('CourseReviewingController', () => {
  let controller: CourseReviewingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseReviewingController],
      providers: [CourseReviewingService],
    }).compile();

    controller = module.get<CourseReviewingController>(
      CourseReviewingController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
