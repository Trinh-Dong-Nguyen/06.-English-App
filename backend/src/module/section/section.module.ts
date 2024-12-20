import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { SectionProfile } from 'src/common/mappers/section.profile';

@Module({
  controllers: [SectionController],
  providers: [SectionService, SectionProfile],
})
export class SectionModule {}
