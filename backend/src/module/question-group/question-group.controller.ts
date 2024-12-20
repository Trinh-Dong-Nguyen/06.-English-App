import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionGroupService } from './question-group.service';
import { CreateQuestionGroupDto } from './dto/create-question-group.dto';
import { UpdateQuestionGroupDto } from './dto/update-question-group.dto';
import { DOCUMENTATION, END_POINTS } from 'src/utils/constants';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { QuestionGroup } from './entities/question-group.entity';
import { ResponseObject } from 'src/utils/objects';

@ApiBearerAuth()
@Controller(END_POINTS.QUESTION_GROUP.BASE)
@ApiTags(DOCUMENTATION.TAGS.QUESTION_GROUP)
export class QuestionGroupController {
  constructor(
    private readonly questionGroupService: QuestionGroupService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post(END_POINTS.QUESTION_GROUP.CREATE)
  @ApiOperation({ summary: 'Create a new question group' })
  async create(@Body() createQuestionGroupDto: CreateQuestionGroupDto) {
    const newQuestionGroup = this.mapper.map(
      createQuestionGroupDto,
      CreateQuestionGroupDto,
      QuestionGroup,
    );
    const result = await this.questionGroupService.create(newQuestionGroup);
    return ResponseObject.create('Question group created', result);
  }

  // @Get(END_POINTS.QUESTION_GROUP.GET_BY_SECTION)
  // @ApiOperation({ summary: 'Find all question groups belong to a section' })
  // findOne(@Param('id') id: string) {
  //   return this.questionGroupService.findOne(+id);
  // }

  @Patch(END_POINTS.QUESTION_GROUP.UPDATE)
  @ApiOperation({ summary: 'Update a question group' })
  async update(@Body() updateQuestionGroupDto: UpdateQuestionGroupDto) {
    const questionGroup = this.mapper.map(
      updateQuestionGroupDto,
      UpdateQuestionGroupDto,
      QuestionGroup,
    );
    const result = await this.questionGroupService.update(questionGroup);
    return ResponseObject.create('Question group updated', result);
  }

  @Delete(END_POINTS.QUESTION_GROUP.DELETE)
  async remove(@Param('id') id: string) {
    const result = await this.questionGroupService.remove(id);
    return ResponseObject.create('Question group deleted', result);
  }
}
