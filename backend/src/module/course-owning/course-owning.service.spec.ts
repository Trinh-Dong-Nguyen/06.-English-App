import { Test, TestingModule } from '@nestjs/testing';
import { CourseOwningService } from './course-owning.service';

describe('CourseOwningService', () => {
  let service: CourseOwningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseOwningService],
    }).compile();

    service = module.get<CourseOwningService>(CourseOwningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
