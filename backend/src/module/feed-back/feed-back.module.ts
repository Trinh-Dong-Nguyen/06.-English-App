import { Module } from '@nestjs/common';
import { FeedBackService } from './feed-back.service';
import { FeedBackController } from './feed-back.controller';

@Module({
  controllers: [FeedBackController],
  providers: [FeedBackService],
})
export class FeedBackModule {}
