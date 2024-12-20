import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProfile } from '../../common/mappers/user.profile';
import { AuthService } from '../auth/auth.service';
import { CognitoService } from '../auth/cognito.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UserController],
  imports: [HttpModule],
  providers: [UserService, UserProfile, AuthService, CognitoService],
})
export class UserModule {}
