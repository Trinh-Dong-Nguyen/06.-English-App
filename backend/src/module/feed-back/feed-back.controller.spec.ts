import { Test, TestingModule } from '@nestjs/testing';
import { FeedBackController } from './feed-back.controller';
import { FeedBackService } from './feed-back.service';

describe('FeedBackController', () => {
  let controller: FeedBackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedBackController],
      providers: [FeedBackService],
    }).compile();

    controller = module.get<FeedBackController>(FeedBackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
