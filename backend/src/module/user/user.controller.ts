import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

import { User } from '../../common/decorators/user.decorator';
import { User as UserEntity } from './entities/user.entity';
import { DOCUMENTATION, END_POINTS } from '../../utils/constants';
import { ResponseObject } from '../../utils/objects';
import { IUser } from '../../common/guards/at.guard';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserDto } from './dto/userD.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';

@ApiBearerAuth()
@ApiTags(DOCUMENTATION.TAGS.USER)
@Controller(END_POINTS.USER.BASE)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get(END_POINTS.USER.ME)
  @ApiOperation({ summary: 'Get user information' })
  async getMe(@User() user: IUser) {
    const res = await this.userService.findMe(user.userAwsId);

    return ResponseObject.create('User retrieved', res);
  }

  @Post(END_POINTS.USER.CREATE)
  @ApiOperation({
    summary:
      'Create a user when normal user or oauth user not found in database',
  })
  async createUser(@User() user: IUser, @Body() userDto: UserDto) {
    const userCreated = this.mapper.map(userDto, UserDto, UserEntity);
    const res = await this.authService.create(userCreated, user.userName);
    return ResponseObject.create('User created', res);
  }
}
