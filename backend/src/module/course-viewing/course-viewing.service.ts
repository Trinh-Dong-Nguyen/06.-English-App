import { Injectable } from '@nestjs/common';
import { CreateCourseViewingDto } from './dto/create-course-viewing.dto';
import { UpdateCourseViewingDto } from './dto/update-course-viewing.dto';

@Injectable()
export class CourseViewingService {
  create(createCourseViewingDto: CreateCourseViewingDto) {
    return 'This action adds a new courseViewing';
  }

  findAll() {
    return `This action returns all courseViewing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseViewing`;
  }

  update(id: number, updateCourseViewingDto: UpdateCourseViewingDto) {
    return `This action updates a #${id} courseViewing`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseViewing`;
  }
}
