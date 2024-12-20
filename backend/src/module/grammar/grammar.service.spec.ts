import { Test, TestingModule } from '@nestjs/testing';
import { GrammarService } from './grammar.service';

describe('GrammarService', () => {
  let service: GrammarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrammarService],
    }).compile();

    service = module.get<GrammarService>(GrammarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
