import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CourseResponseDto } from 'src/module/course/dto/course-response.dto';
import { CreateCourseDto } from 'src/module/course/dto/create-course.dto';
import { UpdateCourseDto } from 'src/module/course/dto/update-course.dto';
import { Course } from 'src/module/course/entities/course.entity';

@Injectable()
export class CourseProfile extends AutomapperProfile {
  private cloudFrontUrl: string;
  constructor(
    @InjectMapper() mapper: Mapper,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    super(mapper);
    this.cloudFrontUrl = this.configService.get<string>('cloudFrontURL');
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Course, CreateCourseDto);
      createMap(mapper, CreateCourseDto, Course);
      createMap(mapper, UpdateCourseDto, Course);
      createMap(
        mapper,
        Course,
        CourseResponseDto,
        forMember(
          (dest) => dest.ratingCount,
          mapFrom((src) =>
            src.courseReviewings?.length ? src.courseReviewings.length : 0,
          ),
        ),
        forMember(
          (dest) => dest.ratingAverage,
          mapFrom((src) =>
            src.courseReviewings?.length
              ? src.courseReviewings.reduce((acc, cur) => acc + cur.rating, 0) /
                src.courseReviewings.length
              : 0,
          ),
        ),
        forMember(
          (dest) => dest.teacherName,
          mapFrom(
            (src) =>
              `${src.teacher.userInfo.firstName} ${src.teacher.userInfo.lastName}`,
          ),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom((src) => src.createDate.toISOString()),
        ),
        forMember(
          (dest) => dest.updatedAt,
          mapFrom((src) => src.updateDate.toISOString()),
        ),
        forMember(
          (dest) => dest.categoryName,
          mapFrom((src) => src.category.name),
        ),
        forMember(
          (dest) => dest.thumbnail_image,
          mapFrom((src) => `${this.cloudFrontUrl}/${src.thumbnail_image}`),
        ),
      );
    };
  }
}
