import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../module/user/entities/user.entity';
import { UserDto } from '../../module/user/dto/userD.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserProfile extends AutomapperProfile {
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
      createMap(mapper, User, UserDto);
      createMap(
        mapper,
        UserDto,
        User,
        forMember(
          (src) => src.avatarURL,
          mapFrom((d) => `${this.cloudFrontUrl}/${d.avatarKey}`),
        ),
      );
    };
  }
}
