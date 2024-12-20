import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';
import { DOCUMENTATION, END_POINTS } from 'src/utils/constants';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CourseCategory } from './entities/course-category.entity';
import { ResponseObject } from 'src/utils/objects';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@Controller(END_POINTS.COURSE_CATEGORY.BASE)
@ApiTags(DOCUMENTATION.TAGS.COURSE_CATEGORY)
export class CourseCategoryController {
  constructor(
    private readonly courseCategoryService: CourseCategoryService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post(END_POINTS.COURSE_CATEGORY.CREATE)
  @ApiOperation({
    summary: 'Create course category',
  })
  async create(@Body() createCourseCategoryDto: CreateCourseCategoryDto) {
    const category = this.mapper.map(
      createCourseCategoryDto,
      CreateCourseCategoryDto,
      CourseCategory,
    );
    const result = await this.courseCategoryService.create(category);
    return ResponseObject.create(
      'Course category created successfully',
      result,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all course categories',
  })
  async findAll() {
    const result = await this.courseCategoryService.findAll();
    return ResponseObject.create(
      'Course categories retrieved successfully',
      result,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get course category by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Course category id',
    example: '493ff37a-136c-4607-af3d-f5bc1c35f718',
  })
  async findOne(@Param('id') id: string) {
    const result = await this.courseCategoryService.findOne(id);
    return ResponseObject.create(
      'Course category retrieved successfully',
      result,
    );
  }

  @Put('')
  @ApiOperation({
    summary: 'Update course category',
  })
  async update(@Body() updateCourseCategoryDto: UpdateCourseCategoryDto) {
    const updateCourse = this.mapper.map(
      updateCourseCategoryDto,
      UpdateCourseCategoryDto,
      CourseCategory,
    );
    const result = await this.courseCategoryService.update(updateCourse);
    return ResponseObject.create(
      'Course category updated successfully',
      result,
    );
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.courseCategoryService.remove(+id);
  }
}
