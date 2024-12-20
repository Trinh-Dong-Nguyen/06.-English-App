import { Test, TestingModule } from '@nestjs/testing';
import { CourseCategoryService } from './course-category.service';

describe('CourseCategoryService', () => {
  let service: CourseCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseCategoryService],
    }).compile();

    service = module.get<CourseCategoryService>(CourseCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
