import { Test, TestingModule } from '@nestjs/testing';
import { CourseBuyingService } from './course-buying.service';

describe('CourseBuyingService', () => {
  let service: CourseBuyingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseBuyingService],
    }).compile();

    service = module.get<CourseBuyingService>(CourseBuyingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
