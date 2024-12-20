import { Test, TestingModule } from '@nestjs/testing';
import { CourseProgressController } from './course-progress.controller';
import { CourseProgressService } from './course-progress.service';

describe('CourseProgressController', () => {
  let controller: CourseProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseProgressController],
      providers: [CourseProgressService],
    }).compile();

    controller = module.get<CourseProgressController>(CourseProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
