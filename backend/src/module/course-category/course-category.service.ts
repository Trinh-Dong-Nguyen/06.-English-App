import { HttpException, Injectable } from '@nestjs/common';
import { CourseCategory } from './entities/course-category.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CourseCategoryService {
  constructor(private readonly dataSource: DataSource) {}
  async create(category: CourseCategory) {
    try {
      const newCategory = await this.dataSource
        .getRepository(CourseCategory)
        .insert(category);
      return newCategory;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll() {
    try {
      const courseCategories = await this.dataSource
        .getRepository(CourseCategory)
        .find();
      return courseCategories;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string) {
    try {
      const courseCategory = await this.dataSource
        .getRepository(CourseCategory)
        .findOne({ where: { id } });
      return courseCategory;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(updateCourseCategory: CourseCategory) {
    try {
      await this.findOne(updateCourseCategory.id);
      const updatedCourseCategory = await this.dataSource
        .getRepository(CourseCategory)
        .save(updateCourseCategory);
      return updatedCourseCategory;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} courseCategory`;
  }
}
