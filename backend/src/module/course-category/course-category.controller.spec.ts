import { Test, TestingModule } from '@nestjs/testing';
import { CourseCategoryController } from './course-category.controller';
import { CourseCategoryService } from './course-category.service';

describe('CourseCategoryController', () => {
  let controller: CourseCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseCategoryController],
      providers: [CourseCategoryService],
    }).compile();

    controller = module.get<CourseCategoryController>(CourseCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
