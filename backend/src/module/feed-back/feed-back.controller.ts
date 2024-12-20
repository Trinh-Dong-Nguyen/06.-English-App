import { Controller } from '@nestjs/common';
import { FeedBackService } from './feed-back.service';

@Controller('feed-back')
export class FeedBackController {
  constructor(private readonly feedBackService: FeedBackService) {}
}
