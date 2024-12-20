import { Test, TestingModule } from '@nestjs/testing';
import { StudentAnswerService } from './student-answer.service';

describe('StudentAnswerService', () => {
  let service: StudentAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentAnswerService],
    }).compile();

    service = module.get<StudentAnswerService>(StudentAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
