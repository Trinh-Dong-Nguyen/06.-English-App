import { HttpException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Course } from './entities/course.entity';
import { Teacher } from '../user/entities/teacher.entity';
import { User } from '../user/entities/user.entity';
import { GetAllCourseQuery } from './dto/get-all-course.dto';
import { STATE } from 'src/utils/constants';

@Injectable()
export class CourseService {
  constructor(private readonly dataSource: DataSource) {}

  async create(awsId: string, course: Course) {
    try {
      const newCourse = await this.dataSource
        .getRepository(Course)
        .insert(course);
      return newCourse;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAllCourses(query: GetAllCourseQuery) {
    try {
      const queryBuilder = this.dataSource
        .getRepository(Course)
        .createQueryBuilder('course')
        .leftJoin('course.category', 'category')
        .leftJoin('course.teacher', 'teacher')
        .leftJoin('teacher.userInfo', 'userInfo')
        .leftJoin('course.courseReviewings', 'courseReviewings')
        .select(['course', 'category.name', 'teacher', 'userInfo'])
        .where('course.state = :state', { state: STATE.PUBLISHED });

      if (query.search) {
        queryBuilder.andWhere('course.title ILIKE :search', {
          search: `%${query.search}%`,
        });
      }

      if (query.categoryId) {
        queryBuilder.andWhere('category.id = :categoryId', {
          categoryId: query.categoryId,
        });
      }

      const [courses, count] = await queryBuilder
        .skip(query.skip)
        .take(query.take)
        .getManyAndCount();
      return { courses, count };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAllRecommendationCourses() {
    try {
      return await this.dataSource
        .getRepository(Course)
        .createQueryBuilder('course')
        .leftJoin('course.category', 'category')
        .leftJoin('course.teacher', 'teacher')
        .leftJoin('teacher.userInfo', 'userInfo')
        .leftJoin('course.courseReviewings', 'courseReviewings')
        .select(['course', 'category.name', 'teacher', 'userInfo'])
        .where('course.state = :state', { state: STATE.PUBLISHED })
        .getMany();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByCategory(categoryId: string) {
    try {
      const courses = await this.dataSource
        .getRepository(Course)
        .find({ where: { category: { id: categoryId } } });
      return courses;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(awsId: string) {
    try {
      const teacher = await this.findTeacherByAwsId(awsId);
      if (!teacher) {
        throw new HttpException('Teacher not found', 404);
      }
      const courses = await this.dataSource
        .getRepository(Course)
        .createQueryBuilder('course')
        .leftJoin('course.category', 'category')
        .leftJoin('course.teacher', 'teacher')
        .leftJoin('course.courseReviewings', 'courseReviewings')
        .leftJoin('teacher.userInfo', 'userInfo')
        .select([
          'course',
          'category.name',
          'teacher',
          'userInfo',
          'courseReviewings',
        ])
        .where('teacher.id = :teacherId', { teacherId: teacher.id })
        .getMany();
      return courses;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAllByStudent(awsId: string) {
    try {
      const courses = await this.dataSource
        .getRepository(Course)
        .createQueryBuilder('course')
        .leftJoin('course.courseOwnings', 'courseOwnings')
        .leftJoin('course.category', 'category')
        .leftJoin('course.teacher', 'teacher')
        .leftJoin('teacher.userInfo', 'teacherInfo')
        .leftJoin('course.courseReviewings', 'courseReviewings')
        .leftJoin('courseOwnings.student', 'student')
        .leftJoin('student.userInfo', 'userInfo')
        .select([
          'course',
          'category.name',
          'teacher',
          'teacherInfo',
          'userInfo',
          'courseReviewings',
        ])
        .where('userInfo.awsCognitoId = :awsId', { awsId })
        .getMany();
      return courses;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string) {
    try {
      const existingCourse = await this.dataSource
        .getRepository(Course)
        .createQueryBuilder('course')
        .leftJoin('course.category', 'category')
        .leftJoin('course.teacher', 'teacher')
        .leftJoin('teacher.userInfo', 'userInfo')
        .select(['course', 'category.name', 'teacher', 'userInfo'])
        .where('course.id = :courseId', { courseId: id })
        .getOne();
      return existingCourse;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  update(course: Course) {
    try {
      const updatedCourse = this.dataSource.getRepository(Course).save(course);
      return updatedCourse;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  remove(id: string) {
    return `This action removes a #${id} course`;
  }

  public async findTeacherByAwsId(awsId: string) {
    const user = await this.dataSource.getRepository(User).findOneOrFail({
      where: { awsCognitoId: awsId },
    });

    const teacher = await this.dataSource
      .getRepository(Teacher)
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.userInfo', 'userInfo')
      .where('userInfo.id = :userId', { userId: user.id })
      .getOne();
    return teacher;
  }
}
