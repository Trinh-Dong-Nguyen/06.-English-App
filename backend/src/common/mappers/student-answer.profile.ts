import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateStudentAnswerDto } from 'src/module/student-answer/dto/create-student-answer.dto';
import { StudentAnswer } from 'src/module/student-answer/entities/student-answer.entity';

@Injectable()
export class StudentAnswerProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CreateStudentAnswerDto,
        StudentAnswer,
        forMember(
          (destination) => destination.question,
          mapFrom((source) => ({ id: source.questionId })),
        ),
      );
    };
  }
}
