import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { DOCUMENTATION, END_POINTS } from 'src/utils/constants';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Lesson } from './entities/lesson.entity';
import { ResponseObject } from 'src/utils/objects';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddGrammarToLessonDto } from './dto/add-grammar-to-lesson.dto';
import { AddVocabularyToLessonDto } from './dto/add-vocabulary-to-lesson.dto';
import { CreateLessonVocabularyDto } from './dto/create-lesson-vocabulary.dto';
import { LessonVocabulary } from './entities/lesson-vocabulary.entity';

@ApiBearerAuth()
@Controller(END_POINTS.LESSON.BASE)
@ApiTags(DOCUMENTATION.TAGS.LESSON)
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}
  @Post(END_POINTS.LESSON.CREATE_NORMAL)
  @ApiOperation({
    summary: 'Create a new normal lesson',
  })
  async createNormalLesson(@Body() createLessonDto: CreateLessonDto) {
    const lesson = await this.mapper.mapAsync(
      createLessonDto,
      CreateLessonDto,
      Lesson,
    );
    const newLesson = await this.lessonService.create(
      lesson,
      createLessonDto.courseId,
    );
    return ResponseObject.create('Create lesson successfully', newLesson);
  }
  @Post(END_POINTS.LESSON.ADD_GRAMMAR_TO_LESSON)
  @ApiOperation({
    summary: 'add an existing grammar to lesson',
  })
  async addGrammarToLesson(
    @Param('lessonId') lessonId: string,
    @Body() dto: AddGrammarToLessonDto,
  ) {
    const updatedLesson = await this.lessonService.addGrammarToLesson(
      lessonId,
      dto.grammarIds,
    );
    return ResponseObject.create(
      'Add grammar to lesson successfully',
      updatedLesson,
    );
  }
  @Post(END_POINTS.LESSON.ADD_VOCABULARY_TO_LESSON)
  @ApiOperation({
    summary: 'add vocabularies to an existing lesson',
  })
  async addVocabularyToLesson(
    @Param('lessonId') lessonId: string,
    @Body() dto: AddVocabularyToLessonDto,
  ) {
    const lesson = await this.lessonService.findOne(lessonId);
    const vocabularies = await this.mapper.mapArrayAsync(
      dto.vocabularies,
      CreateLessonVocabularyDto,
      LessonVocabulary,
    );
    console.log('lesson', lesson);
    vocabularies.forEach((vocabulary) =>
      lesson.lessonVocabularies.push(vocabulary),
    );
    const updatedLesson =
      await this.lessonService.addVocabularyToLesson(lesson);
    return ResponseObject.create(
      'Add vocabularies to lesson successfully',
      updatedLesson,
    );
  }
  @Get(END_POINTS.LESSON.GET_ONE)
  @ApiOperation({
    summary: 'Get one lesson by id',
  })
  async findOne(@Param('id') id: string) {
    const lesson = await this.lessonService.findOne(id);
    return ResponseObject.create('Get lesson successfully', lesson);
  }
  @Get(END_POINTS.LESSON.GET_ALL_LESSONS_BY_COURSE)
  async getAllLessonOfCourse(@Param('courseId') courseId: string) {
    const result = await this.lessonService.getAllLessonOfCourse(courseId);
    return ResponseObject.create('Get all lessons successfully', result);
  }
  @Get(END_POINTS.LESSON.GET_ALL_GRAMMAR_BY_LESSON)
  async getAllGrammarByLesson(@Param('lessonId') lessonId: string) {
    const result = await this.lessonService.getAllGrammarByLesson(lessonId);
    return ResponseObject.create(
      'Get all grammar by lesson successfully',
      result,
    );
  }
  @Get(END_POINTS.LESSON.GET_ALL_VOCABULARY_BY_LESSON)
  async getAllVocabularyByLesson(@Param('lessonId') lessonId: string) {
    const result = await this.lessonService.getAllVocabularyByLesson(lessonId);
    return ResponseObject.create(
      'Get all vocabulary by lesson successfully',
      result,
    );
  }
}
