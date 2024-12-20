import { Injectable } from '@nestjs/common';
import { CreateCourseReviewingDto } from './dto/create-course-reviewing.dto';
import { UpdateCourseReviewingDto } from './dto/update-course-reviewing.dto';

@Injectable()
export class CourseReviewingService {
  create(createCourseReviewingDto: CreateCourseReviewingDto) {
    return 'This action adds a new courseReviewing';
  }

  findAll() {
    return `This action returns all courseReviewing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseReviewing`;
  }

  update(id: number, updateCourseReviewingDto: UpdateCourseReviewingDto) {
    return `This action updates a #${id} courseReviewing`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseReviewing`;
  }
}
