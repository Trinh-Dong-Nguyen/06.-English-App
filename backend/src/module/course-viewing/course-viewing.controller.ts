import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseViewingService } from './course-viewing.service';
import { CreateCourseViewingDto } from './dto/create-course-viewing.dto';
import { UpdateCourseViewingDto } from './dto/update-course-viewing.dto';

@Controller('course-viewing')
export class CourseViewingController {
  constructor(private readonly courseViewingService: CourseViewingService) {}

  @Post()
  create(@Body() createCourseViewingDto: CreateCourseViewingDto) {
    return this.courseViewingService.create(createCourseViewingDto);
  }

  @Get()
  findAll() {
    return this.courseViewingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseViewingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseViewingDto: UpdateCourseViewingDto) {
    return this.courseViewingService.update(+id, updateCourseViewingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseViewingService.remove(+id);
  }
}
