import { Test, TestingModule } from '@nestjs/testing';
import { CourseOwningController } from './course-owning.controller';
import { CourseOwningService } from './course-owning.service';

describe('CourseOwningController', () => {
  let controller: CourseOwningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseOwningController],
      providers: [CourseOwningService],
    }).compile();

    controller = module.get<CourseOwningController>(CourseOwningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
