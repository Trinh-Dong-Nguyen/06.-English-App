import { Test, TestingModule } from '@nestjs/testing';
import { CourseViewingService } from './course-viewing.service';

describe('CourseViewingService', () => {
  let service: CourseViewingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseViewingService],
    }).compile();

    service = module.get<CourseViewingService>(CourseViewingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
