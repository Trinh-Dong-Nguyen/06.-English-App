import { Test, TestingModule } from '@nestjs/testing';
import { CourseProgressService } from './course-progress.service';

describe('CourseProgressService', () => {
  let service: CourseProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseProgressService],
    }).compile();

    service = module.get<CourseProgressService>(CourseProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
