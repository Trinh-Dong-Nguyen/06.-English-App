import { Test, TestingModule } from '@nestjs/testing';
import { FeedBackService } from './feed-back.service';

describe('FeedBackService', () => {
  let service: FeedBackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedBackService],
    }).compile();

    service = module.get<FeedBackService>(FeedBackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
