import { HttpException, Injectable } from '@nestjs/common';
import HttpStatusCode from 'src/utils/HttpStatusCode';
import { StudentAnswer } from './entities/student-answer.entity';
import { DataSource } from 'typeorm';
import { Student } from '../user/entities/student.entity';
import { Question } from '../question/entities/question.entity';
import { QUESTION_TYPE } from 'src/utils/constants';
import { SectionProgress } from '../course-owning/entities/section-progress.entity';
import { CourseOwning } from '../course-owning/entities/course-owning.entity';
import { LessonProgress } from '../course-owning/entities/lesson-progress.entity';

@Injectable()
export class StudentAnswerService {
  constructor(private readonly dataSource: DataSource) {}
  async submit(studentAnswers: StudentAnswer[], userAwsId: string) {
    try {
      const student = await this.dataSource
        .getRepository(Student)
        .createQueryBuilder('student')
        .leftJoin('student.userInfo', 'userInfo')
        .select(['student', 'userInfo'])
        .where('userInfo.awsCognitoId = :awsId', { awsId: userAwsId })
        .getOne();
      if (!student) {
        throw new HttpException('Student not found', HttpStatusCode.NOT_FOUND);
      }
      await Promise.all(
        studentAnswers.map(async (studentAnswer) => {
          studentAnswer.student = student;
          studentAnswer.question = await this.dataSource
            .getRepository(Question)
            .findOne({ where: { id: studentAnswer.question.id } });
        }),
      );
      await Promise.all(
        studentAnswers.map(async (studentAnswer) => {
          const correctAnswer = studentAnswer.question.answers.filter(
            (answer) => answer.isCorrect,
          );
          if (studentAnswer.question.type === QUESTION_TYPE.COMBO_BOX) {
            if (correctAnswer[0].text === studentAnswer.answer) {
              studentAnswer.isCorrect = true;
            } else {
              studentAnswer.isCorrect = false;
            }
          }
          if (studentAnswer.question.type === QUESTION_TYPE.MULTIPLE_CHOICE) {
            if (correctAnswer.length !== studentAnswer.answer.length) {
              studentAnswer.isCorrect = false;
              return studentAnswer;
            }
            for (let i = 0; i < studentAnswer.question.answers.length; i++) {
              if (studentAnswer.question.answers[i].isCorrect) {
                if (
                  studentAnswer.answer.includes(
                    studentAnswer.question.answers[i].text,
                  )
                ) {
                  continue;
                } else {
                  studentAnswer.isCorrect = false;
                  return studentAnswer;
                }
              }
            }
            studentAnswer.isCorrect = true;
          }
          if (studentAnswer.question.type === QUESTION_TYPE.BLANK) {
            if (correctAnswer[0].text === studentAnswer.answer) {
              studentAnswer.isCorrect = true;
            } else {
              studentAnswer.isCorrect = false;
            }
          }
        }),
      );
      await this.dataSource.getRepository(StudentAnswer).save(studentAnswers);
      const courseOwning = await this.dataSource
        .getRepository(CourseOwning)
        .createQueryBuilder('courseOwning')
        .leftJoin('courseOwning.student', 'student')
        .leftJoin('courseOwning.lessonProgresses', 'lessonProgresses')
        .select(['courseOwning', 'student', 'lessonProgresses'])
        .where('student.id = :studentId', { studentId: student.id })
        .andWhere('courseOwning.expiredDate > :currDate', {
          currDate: new Date(),
        })
        .getOneOrFail();
      const sectionProgress = await this.dataSource
        .getRepository(SectionProgress)
        .createQueryBuilder('sectionProgress')
        .leftJoinAndSelect('sectionProgress.courseOwning', 'courseOwning')
        .where('courseOwning.id = :courseOwningId', {
          courseOwningId: courseOwning.id,
        })
        .getOneOrFail();
      sectionProgress.isCompleted = true;
      const lessonProgress = await this.dataSource
        .getRepository(LessonProgress)
        .createQueryBuilder('lessonProgress')
        .leftJoinAndSelect(
          'lessonProgress.sectionProgresses',
          'sectionProgresses',
        )
        .leftJoinAndSelect('lessonProgress.courseOwning', 'courseOwning')
        .where('courseOwning.id = :courseOwningId', {
          courseOwningId: courseOwning.id,
        })
        .getOneOrFail();
      const isLessonCompleted = lessonProgress.sectionProgresses.every(
        (section) => section.isCompleted,
      );
      lessonProgress.isCompleted = isLessonCompleted;
      const numberOfLesson = courseOwning.lessonProgresses.length;
      const numberOfCompletedLesson = courseOwning.lessonProgresses.filter(
        (lesson) => lesson.isCompleted,
      ).length;
      courseOwning.progress = (numberOfCompletedLesson / numberOfLesson) * 100;
      return studentAnswers;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all studentAnswer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentAnswer`;
  }
}
