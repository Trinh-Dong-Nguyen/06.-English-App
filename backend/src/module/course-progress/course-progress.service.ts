import { Injectable } from '@nestjs/common';
import { CreateCourseProgressDto } from './dto/create-course-progress.dto';
import { UpdateCourseProgressDto } from './dto/update-course-progress.dto';

@Injectable()
export class CourseProgressService {
  create(createCourseProgressDto: CreateCourseProgressDto) {
    return 'This action adds a new courseProgress';
  }

  findAll() {
    return `This action returns all courseProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseProgress`;
  }

  update(id: number, updateCourseProgressDto: UpdateCourseProgressDto) {
    return `This action updates a #${id} courseProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseProgress`;
  }
}
