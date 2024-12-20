import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto, SectionQuestionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DOCUMENTATION, END_POINTS } from 'src/utils/constants';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Section } from './entities/section.entity';
import { ResponseObject } from 'src/utils/objects';
import { ResponseSectionDto } from './dto/response-section.dto';
import { QuestionGroup } from '../question-group/entities/question-group.entity';
import { CreateQuestionDto } from '../question/dto/create-question.dto';
import { Question } from '../question/entities/question.entity';
import { Answer } from '../answer/entities/answer.entity';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';

@ApiBearerAuth()
@Controller(END_POINTS.SECTION.BASE)
@ApiTags(DOCUMENTATION.TAGS.SECTION)
export class SectionController {
  constructor(
    private readonly sectionService: SectionService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post(END_POINTS.SECTION.CREATE)
  @ApiOperation({
    summary: 'Create a new section',
  })
  async create(@Body() createSectionDto: CreateSectionDto) {
    // console.log(createSectionDto);
    const section = await this.mapper.mapAsync(
      createSectionDto,
      CreateSectionDto,
      Section,
    );

    const questionGroups = [];
    const questions = [];

    if (createSectionDto.sectionQuestionGroups) {
      createSectionDto.sectionQuestionGroups.forEach((sectionQuestionGroup) => {
        const newQuestionGroup = this.mapper.map(
          sectionQuestionGroup,
          SectionQuestionDto,
          QuestionGroup,
        );
        if (!newQuestionGroup.questions) {
          newQuestionGroup.questions = [];
        }
        sectionQuestionGroup.questions.forEach((question) => {
          const newQuestion = this.mapper.map(
            question,
            CreateQuestionDto,
            Question,
          );
          newQuestion.questionGroup = newQuestionGroup;
          if (!newQuestion.answers) {
            newQuestion.answers = [];
          }
          question.answers.forEach((answer) => {
            const newAnswer = this.mapper.map(answer, CreateAnswerDto, Answer);
            newAnswer.question = newQuestion;
            newQuestion.answers.push(newAnswer);
          });
          newQuestionGroup.questions.push(newQuestion);
        });

        newQuestionGroup.section = section;
        questionGroups.push(newQuestionGroup);
      });
    }
    if (createSectionDto.sectionQuestions) {
      createSectionDto.sectionQuestions.forEach((sectionQuestion) => {
        const newQuestion = this.mapper.map(
          sectionQuestion,
          CreateQuestionDto,
          Question,
        );
        newQuestion.section = section;
        if (!newQuestion.answers) {
          newQuestion.answers = [];
        }
        sectionQuestion.answers.forEach((answer) => {
          const newAnswer = this.mapper.map(answer, CreateAnswerDto, Answer);
          newAnswer.question = newQuestion;
          newQuestion.answers.push(newAnswer);
        });

        questions.push(newQuestion);
      });
    }
    section.questionGroups = questionGroups;
    section.questions = questions;

    const newSection = await this.sectionService.create(
      createSectionDto.lessonId,
      section,
    );

    const response = await this.mapper.mapAsync(
      newSection,
      Section,
      ResponseSectionDto,
    );

    return ResponseObject.create('Section created successfully', response);
  }

  @Get(END_POINTS.SECTION.GET_ALL_SECTION_BY_LESSON)
  @ApiOperation({
    summary: 'Get all sections by lesson',
  })
  @ApiParam({
    name: 'lessonId',
    example: '03315cdb-732a-4e63-ac8b-8bed5a40b374',
    type: String,
    description: 'ID của Lesson cần lấy dữ liệu',
    required: true,
  })
  async findAllByLesson(@Param('lessonId') lessonId: string) {
    const sections = await this.sectionService.findAllByLesson(lessonId);
    const responses = await this.mapper.mapArrayAsync(
      sections,
      Section,
      ResponseSectionDto,
    );
    return ResponseObject.create('Sections found', responses);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Section found',
  })
  @ApiParam({
    name: 'id',
    example: '3fa394d0-3aa7-4f6f-9684-9eada252e639',
    type: String,
    description: 'ID of Section to get',
    required: true,
  })
  async findOne(@Param('id') id: string) {
    const section = await this.sectionService.findOne(id);
    return ResponseObject.create('Section found', section);
  }

  @Patch()
  @ApiOperation({
    summary: 'Update a section',
  })
  async update(@Body() updateSectionDto: UpdateSectionDto) {
    const section = await this.mapper.mapAsync(
      updateSectionDto,
      UpdateSectionDto,
      Section,
    );
    const updatedSection = await this.sectionService.update(
      section,
      updateSectionDto.lessionId,
    );
    return ResponseObject.create(
      'Section updated successfully',
      updatedSection,
    );
  }

  @Delete(':id')
  async sremove(@Param('id') id: string) {
    return this.sectionService.remove(+id);
  }
}
