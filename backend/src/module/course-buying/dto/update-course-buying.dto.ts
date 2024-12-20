import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseBuyingDto } from './create-course-buying.dto';

export class UpdateCourseBuyingDto extends PartialType(CreateCourseBuyingDto) {}
