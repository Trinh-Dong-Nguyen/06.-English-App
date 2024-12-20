import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Question } from './entities/question.entity';
import { Answer } from '../answer/entities/answer.entity';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { ResponseObject } from 'src/utils/objects';
import { DOCUMENTATION, END_POINTS } from 'src/utils/constants';
import { UpdateAnswerDto } from '../answer/dto/update-answer.dto';
import { groupQuestionsByQuestionGroup } from './functions/functions';

@ApiBearerAuth()
@Controller(END_POINTS.QUESTION.BASE)
@ApiTags(DOCUMENTATION.TAGS.QUESTION)
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post(END_POINTS.QUESTION.CREATE)
  @ApiOperation({ summary: 'Create a new question with its answers' })
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    const question = this.mapper.map(
      createQuestionDto,
      CreateQuestionDto,
      Question,
    );
    const answer = this.mapper.mapArray(
      createQuestionDto.answers,
      CreateAnswerDto,
      Answer,
    );
    question.answers = answer;
    const newQuestion = await this.questionService.create(question);

    return ResponseObject.create('Question created', newQuestion);
  }

  @Get(END_POINTS.QUESTION.FIND_BY_SECTION)
  @ApiOperation({ summary: 'Find all questions belong to a section' })
  @ApiParam({ name: 'sectionId', type: 'string' })
  async findBySection(@Query('sectionId') sectionId: string) {
    const questions = await this.questionService.findBySection(sectionId);
    const res = groupQuestionsByQuestionGroup(questions);

    return ResponseObject.create('Questions found', res);
  }

  @ApiOperation({ summary: "Update a question and it's answers" })
  @Put(END_POINTS.QUESTION.PUT)
  async update(@Body() updateQuestionDto: UpdateQuestionDto) {
    const question = this.mapper.map(
      updateQuestionDto,
      UpdateQuestionDto,
      Question,
    );
    console.log('DTO: ', updateQuestionDto);
    const answer = this.mapper.mapArray(
      updateQuestionDto.answers,
      UpdateAnswerDto,
      Answer,
    );
    question.answers = answer;
    console.log('Mapped question: ', question);
    const result = await this.questionService.update(question);
    return ResponseObject.create('Question updated', result);
  }

  @Delete(END_POINTS.QUESTION.DELETE)
  @ApiOperation({ summary: 'Delete a question' })
  async remove(@Param('id') id: string) {
    const res = await this.questionService.remove(id);
    return ResponseObject.create('Question deleted', res);
  }
}
