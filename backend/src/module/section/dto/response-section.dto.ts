import { AutoMap } from '@automapper/classes';
import { IsEnum, IsString } from 'class-validator';
import { SECTION_TYPE } from 'src/utils/constants';

export class ResponseSectionDto {
  @IsString()
  @AutoMap()
  id: string;
  @IsString()
  @AutoMap()
  title: string;
  @IsEnum(SECTION_TYPE)
  @AutoMap()
  type: SECTION_TYPE;
  @IsString()
  @AutoMap()
  sectionMedia: string;
  @IsString()
  @AutoMap()
  lessonId: string;
  @IsString()
  @AutoMap()
  createdAt: Date;
  @IsString()
  @AutoMap()
  updatedAt: Date;
}
