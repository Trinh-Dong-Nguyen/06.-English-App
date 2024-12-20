import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { DataSource } from 'typeorm';
import { CourseService } from '../course/course.service';
import { GrammarService } from '../grammar/grammar.service';
import { Grammar } from '../grammar/entities/grammar.entity';
import { LessonVocabulary } from './entities/lesson-vocabulary.entity';

@Injectable()
export class LessonService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly courseService: CourseService,
    private readonly grammarService: GrammarService,
  ) {}
  async create(lesson: Lesson, courseId: string) {
    try {
      const course = await this.courseService.findOne(courseId);
      if (!course) {
        throw new BadRequestException('Course not found');
      }
      lesson.course = course;
      const newLesson = await this.dataSource
        .getRepository(Lesson)
        .save(lesson);
      return newLesson;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }
  async getAllLessonOfCourse(courseId: string) {
    try {
      const lessons = await this.dataSource
        .getRepository(Lesson)
        .createQueryBuilder('lesson')
        .leftJoin('lesson.course', 'course')
        .where('course.id = :courseId', { courseId })
        .getMany();
      return lessons;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }
  async addGrammarToLesson(lessonId: string, grammarIds: string[]) {
    try {
      const lesson = await this.dataSource
        .getRepository(Lesson)
        .findOne({ where: { id: lessonId } });
      const grammars = await Promise.all(
        grammarIds.map(async (grammarId) => {
          const grammar = await this.grammarService.findOne(grammarId);
          return grammar;
        }),
      );
      grammars.forEach((grammar) => lesson.grammars.push(grammar));
      const updatedLesson = await this.dataSource
        .getRepository(Lesson)
        .save(lesson);
      return updatedLesson;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }

  async addVocabularyToLesson(lesson: Lesson) {
    try {
      const updatedLesson = await this.dataSource
        .getRepository(Lesson)
        .save(lesson);
      return updatedLesson;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string) {
    try {
      const lesson = await this.dataSource
        .getRepository(Lesson)
        .createQueryBuilder('lesson')
        .leftJoinAndSelect('lesson.grammars', 'grammars')
        .leftJoinAndSelect('lesson.lessonVocabularies', 'lessonVocabularies')
        .where('lesson.id = :id', { id })
        .getOneOrFail();
      return lesson;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }

  async update(lesson: Lesson) {
    try {
      const updatedLesson = await this.dataSource
        .getRepository(Lesson)
        .save(lesson);
      return updatedLesson;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.dataSource.getRepository(Lesson).delete(id);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }
  async getAllGrammarByLesson(lessonId: string) {
    try {
      const grammars = await this.dataSource
        .getRepository(Grammar)
        .createQueryBuilder('grammar')
        .leftJoinAndSelect('grammar.lessons', 'lesson')
        .where('lesson.id = :lessonId', { lessonId })
        .getMany();
      return grammars;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }
  async getAllVocabularyByLesson(lessonId: string) {
    try {
      const vocabularies = await this.dataSource
        .getRepository(LessonVocabulary)
        .createQueryBuilder('lessonVocabulary')
        .leftJoin('lessonVocabulary.lesson', 'lesson')
        .where('lesson.id = :lessonId', { lessonId })
        .getMany();
      return vocabularies;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }
}
