import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseProgressService } from './course-progress.service';
import { CreateCourseProgressDto } from './dto/create-course-progress.dto';
import { UpdateCourseProgressDto } from './dto/update-course-progress.dto';

@Controller('course-progress')
export class CourseProgressController {
  constructor(private readonly courseProgressService: CourseProgressService) {}

  @Post()
  create(@Body() createCourseProgressDto: CreateCourseProgressDto) {
    return this.courseProgressService.create(createCourseProgressDto);
  }

  @Get()
  findAll() {
    return this.courseProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseProgressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseProgressDto: UpdateCourseProgressDto) {
    return this.courseProgressService.update(+id, updateCourseProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseProgressService.remove(+id);
  }
}
