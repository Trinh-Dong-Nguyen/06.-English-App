import { Test, TestingModule } from '@nestjs/testing';
import { CourseViewingController } from './course-viewing.controller';
import { CourseViewingService } from './course-viewing.service';

describe('CourseViewingController', () => {
  let controller: CourseViewingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseViewingController],
      providers: [CourseViewingService],
    }).compile();

    controller = module.get<CourseViewingController>(CourseViewingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
