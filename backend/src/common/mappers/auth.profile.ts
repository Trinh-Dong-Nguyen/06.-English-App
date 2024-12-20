import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from '../../module/auth/dto/register-auth.dto';
import { RegisterCognitoDto } from '../../module/auth/dto/register-cognito.dto';
import { User } from '../../module/user/entities/user.entity';

@Injectable()
export class AuthProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        RegisterAuthDto,
        RegisterCognitoDto,
        forMember(
          (dest) => dest.name,
          mapFrom((src) => `${src.firstName} ${src.lastName}`),
        ),
      );
      createMap(mapper, RegisterAuthDto, User);
    };
  }
}
