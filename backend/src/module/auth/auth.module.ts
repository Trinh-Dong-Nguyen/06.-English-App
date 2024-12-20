import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthProfile } from '../../common/mappers/auth.profile';
import { CognitoService } from './cognito.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AuthController],
  imports: [HttpModule],
  providers: [AuthService, AuthProfile, CognitoService],
})
export class AuthModule {}
