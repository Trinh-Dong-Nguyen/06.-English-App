import { HttpException, Injectable } from '@nestjs/common';
import { CreateQuestionGroupDto } from './dto/create-question-group.dto';
import { UpdateQuestionGroupDto } from './dto/update-question-group.dto';
import { QuestionGroup } from './entities/question-group.entity';
import { DataSource } from 'typeorm';
import { Section } from '../section/entities/section.entity';

@Injectable()
export class QuestionGroupService {
  constructor(private readonly dataSource: DataSource) {}

  async create(questionGroup: QuestionGroup) {
    try {
      const section = await this.dataSource
        .getRepository(Section)
        .findOneOrFail({
          where: { id: questionGroup.section.id },
        });
      questionGroup.section = section;
      const newQuestionGroup = await this.dataSource
        .getRepository(QuestionGroup)
        .save(questionGroup);

      return newQuestionGroup;
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  findAll() {
    return `This action returns all questionGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionGroup`;
  }

  update(questionGroup: QuestionGroup) {
    try {
      const updatedQuestionGroup = this.dataSource
        .getRepository(QuestionGroup)
        .save(questionGroup);
      return updatedQuestionGroup;
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  remove(id: string) {
    try {
      const deleteResult = this.dataSource
        .getRepository(QuestionGroup)
        .delete(id);
      return deleteResult;
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }
}
