import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateSectionDto } from 'src/module/section/dto/create-section.dto';
import { ResponseSectionDto } from 'src/module/section/dto/response-section.dto';
import { UpdateSectionDto } from 'src/module/section/dto/update-section.dto';
import { Section } from 'src/module/section/entities/section.entity';

@Injectable()
export class SectionProfile extends AutomapperProfile {
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
      createMap(
        mapper,
        CreateSectionDto,
        Section,
        forMember(
          (src) => src.sectionMedia,
          mapFrom((d) => `${this.cloudFrontUrl}/${d.sectionMedia}`),
        ),
      );
      createMap(
        mapper,
        UpdateSectionDto,
        Section,
        forMember(
          (src) => src.sectionMedia,
          mapFrom((d) => `${this.cloudFrontUrl}/${d.sectionMedia}`),
        ),
      );
      createMap(
        mapper,
        Section,
        ResponseSectionDto,
        forMember(
          (src) => src.lessonId,
          mapFrom((d) => d.lesson.id),
        ),
      );
    };
  }
}
