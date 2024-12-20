import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseReviewingService } from './course-reviewing.service';
import { CreateCourseReviewingDto } from './dto/create-course-reviewing.dto';
import { UpdateCourseReviewingDto } from './dto/update-course-reviewing.dto';

@Controller('course-reviewing')
export class CourseReviewingController {
  constructor(
    private readonly courseReviewingService: CourseReviewingService,
  ) {}

  @Post()
  create(@Body() createCourseReviewingDto: CreateCourseReviewingDto) {
    return this.courseReviewingService.create(createCourseReviewingDto);
  }

  @Get()
  findAll() {
    return this.courseReviewingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseReviewingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseReviewingDto: UpdateCourseReviewingDto,
  ) {
    return this.courseReviewingService.update(+id, updateCourseReviewingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseReviewingService.remove(+id);
  }
}
