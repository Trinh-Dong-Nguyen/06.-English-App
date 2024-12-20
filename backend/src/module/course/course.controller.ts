import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DOCUMENTATION, END_POINTS } from 'src/utils/constants';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Course } from './entities/course.entity';
import { ResponseObject } from 'src/utils/objects';
import { User } from 'src/common/decorators/user.decorator';
import { IUser } from 'src/common/guards/at.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CourseCategoryService } from '../course-category/course-category.service';
import { GetAllCourseQuery } from './dto/get-all-course.dto';
import {
  PaginatedResponse,
  PaginatedResult,
} from 'src/utils/paginated-response';
import { CourseResponseDto } from './dto/course-response.dto';

@ApiBearerAuth()
@Controller(END_POINTS.COURSE.BASE)
@ApiTags(DOCUMENTATION.TAGS.COURSE)
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly courseCategoryService: CourseCategoryService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post(END_POINTS.COURSE.CREATE)
  @ApiOperation({ summary: 'Create course' })
  async create(@User() user: IUser, @Body() createCourseDto: CreateCourseDto) {
    const [category, teacher] = await Promise.all([
      this.courseCategoryService.findOne(createCourseDto.categoryId),
      this.courseService.findTeacherByAwsId(user.userAwsId),
    ]);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const course = this.mapper.map(createCourseDto, CreateCourseDto, Course);
    course.category = category;
    course.teacher = teacher;
    const result = await this.courseService.create(user.userAwsId, course);
    return ResponseObject.create('Course created', result);
  }

  @Get(END_POINTS.COURSE.GET_ALL_COURSES)
  @ApiOperation({
    summary: 'Get all courses in home page, but only get public course',
  })
  async findAllCourses(@Query() query: GetAllCourseQuery) {
    const { courses, count } = await this.courseService.findAllCourses(query);
    const coursesReponse = this.mapper.mapArray(
      courses,
      Course,
      CourseResponseDto,
    );
    return PaginatedResult.create(
      'Courses retrieved successfully',
      PaginatedResponse.create(coursesReponse, query.page, count, query.take),
    );
  }

  @Get(END_POINTS.COURSE.GET_RECOMMENDATION_COURSES)
  @ApiOperation({ summary: 'Get recommendation course by student' })
  async findAllRecommendationCourses() {
    const courses = await this.courseService.findAllRecommendationCourses();
    const coursesReponse = this.mapper.mapArray(
      courses,
      Course,
      CourseResponseDto,
    );
    return ResponseObject.create(
      'Courses recommendation retrieved successfully',
      coursesReponse,
    );
  }

  @Get(END_POINTS.COURSE.GET_MY_COURSE_BY_TEACHER)
  @ApiOperation({
    summary: 'Get all courses of teacher',
  })
  async findMyCourseByTeacher(@User() user: IUser) {
    const courses = await this.courseService.findAll(user.userAwsId);
    const coursesReponse = await this.mapper.mapArrayAsync(
      courses,
      Course,
      CourseResponseDto,
    );
    return ResponseObject.create(
      'Courses retrieved successfully',
      coursesReponse,
    );
  }

  @Get(END_POINTS.COURSE.GET_MY_COURSE_BY_STUDENT)
  @ApiOperation({
    summary: 'Get all courses of user',
  })
  async findMyCourseByUser(@User() user: IUser) {
    const courses = await this.courseService.findAllByStudent(user.userAwsId);
    const coursesReponse = await this.mapper.mapArrayAsync(
      courses,
      Course,
      CourseResponseDto,
    );
    return ResponseObject.create(
      'Courses retrieved successfully',
      coursesReponse,
    );
  }

  @Get(END_POINTS.COURSE.GET_DETAIL)
  @ApiOperation({
    summary: 'Get course detail by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Course id',
    example: 'd1911740-84e0-4778-9c0d-4465dcb1d13e',
  })
  async findOne(@Param('id') id: string) {
    const result = await this.courseService.findOne(id);
    return ResponseObject.create('Course retrieved successfully', result);
  }

  @Put(END_POINTS.COURSE.UPDATE)
  @ApiOperation({
    summary: 'Update course',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Course id',
    example: 'd1911740-84e0-4778-9c0d-4465dcb1d13e',
  })
  async update(@User() user: IUser, @Body() updateCourseDto: UpdateCourseDto) {
    const category = await this.courseCategoryService.findOne(
      updateCourseDto.categoryId,
    );
    const teacher = await this.courseService.findTeacherByAwsId(user.userAwsId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const courseUpdated = this.mapper.map(
      updateCourseDto,
      UpdateCourseDto,
      Course,
    );
    courseUpdated.teacher = teacher;
    courseUpdated.category = category;
    const result = await this.courseService.update(courseUpdated);
    return ResponseObject.create('Course updated', result);
  }

  @Delete(END_POINTS.COURSE.DELETE)
  @ApiOperation({
    summary: 'Delete course',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Course id',
    example: 'd1911740-84e0-4778-9c0d-4465dcb1d13e',
  })
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
