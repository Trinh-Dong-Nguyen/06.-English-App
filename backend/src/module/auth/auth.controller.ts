import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { InjectMapper } from '@automapper/nestjs';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Mapper } from '@automapper/core';
import { CognitoService } from './cognito.service';
import { RegisterCognitoDto } from './dto/register-cognito.dto';
import { User as UserReq } from '../../common/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { SignInCognitoDto } from './dto/sign-in-cognito.dto';
import { DOCUMENTATION, END_POINTS } from '../../utils/constants';
import { Public } from '../../common/decorators/public.decorator';
import { ConfirmSignUpDto } from './dto/confirm-sign-up.dto';
import { IUser } from '../../common/guards/at.guard';
import { ResponseObject } from '../../utils/objects';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ConfirmForgotPasswordDto } from './dto/confirm-forgot-password.dto';

@ApiTags(DOCUMENTATION.TAGS.AUTH)
@Controller(END_POINTS.AUTH.BASE)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly cognitoService: CognitoService,
  ) {}

  @Public()
  @Post(END_POINTS.AUTH.SIGN_UP)
  @ApiOperation({ summary: 'Register a new user' })
  async signUp(
    @UserReq() user: IUser,
    @Body() registerAuthDto: RegisterAuthDto,
  ) {
    const registerCognitoDto = this.mapper.map(
      registerAuthDto,
      RegisterAuthDto,
      RegisterCognitoDto,
    );
    const cognitoId = await this.cognitoService.signUp(registerCognitoDto);
    const userCreated = this.mapper.map(registerAuthDto, RegisterAuthDto, User);
    userCreated.awsCognitoId = cognitoId;
    const res = await this.authService.create(userCreated, user.userName);
    return ResponseObject.create('User created', res);
  }

  // @Public()
  // @Post(END_POINTS.AUTH.OAUTH2_CREATE)
  // @ApiOperation({
  //   summary: 'Create a user with OAuth2 account not found in DB',
  // })
  // async oauth2Create(@Body() userDto: UserDto) {
  //   const userCreated = this.mapper.map(userDto, UserDto, User);
  //   const res = await this.authService.create(userCreated);
  //   return ResponseObject.create('User created', res);
  // }

  @Public()
  @Post(END_POINTS.AUTH.SIGN_IN)
  @ApiOperation({ summary: 'Sign in a user' })
  async signIn(
    @Body() signInCognitoDto: SignInCognitoDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, isEmailVerified, refreshToken } =
      await this.cognitoService.signIn(signInCognitoDto);
    if (!isEmailVerified) {
      throw new UnauthorizedException('Email not verified');
    }
    this.authService.setRefreshToken(response, refreshToken);
    return ResponseObject.create('User signed in', { accessToken });
  }

  @Public()
  @Post(END_POINTS.AUTH.CONFIRM_SIGN_UP)
  @ApiOperation({ summary: "Confirm a user's email after signing up" })
  async confirmSignUp(@Body() confirmSignUpDto: ConfirmSignUpDto) {
    const res = await this.cognitoService.confirmSignUp(confirmSignUpDto);
    return ResponseObject.create("User's email confirmed", res);
  }

  @Public()
  @Post(END_POINTS.AUTH.FORGOT_PASSWORD)
  @ApiOperation({ summary: 'Forgot password' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const res = await this.cognitoService.forgotPassword(forgotPasswordDto);
    return ResponseObject.create('Forgot password', res);
  }

  @Public()
  @Post(END_POINTS.AUTH.CONFIRM_FORGOT_PASSWORD)
  @ApiOperation({ summary: 'Confirm forgot password' })
  async confirmForgotPassword(
    @Body() confirmForgotPasswordDto: ConfirmForgotPasswordDto,
  ) {
    const res = await this.cognitoService.confirmForgotPassword(
      confirmForgotPasswordDto,
    );
    return ResponseObject.create('Forgot password confirmed', res);
  }

  @Public()
  @Post(END_POINTS.AUTH.REFRESH_TOKEN)
  @ApiOperation({ summary: 'Refresh access token' })
  async refreshToken(@Req() req: Request) {
    const refreshToken = this.authService.getRefreshToken(req);
    const { accessToken } =
      await this.cognitoService.refreshAccessToken(refreshToken);
    return ResponseObject.create('Access token refreshed', { accessToken });
  }

  @Public()
  @Get(END_POINTS.AUTH.CALL_BACK)
  @ApiOperation({
    summary: 'Callback for signing in with OAuth (Google, Facebook)',
  })
  async googleSignInCallback(
    @Query('code') code: string,
    @Res() response: Response,
  ) {
    const { userInfo, accessToken, refreshToken } =
      await this.cognitoService.handleOauth(code);
    this.authService.setRefreshToken(response, refreshToken);
    return ResponseObject.create('User signed in', { userInfo, accessToken });
  }

  @Public()
  @Post(END_POINTS.AUTH.SIGN_OUT)
  @ApiOperation({ summary: 'Sign out a user' })
  async signOut(@UserReq() user: IUser, @Res() response: Response) {
    this.authService.removeRefreshToken(response);
    await this.cognitoService.signOut(user.userName);
    return ResponseObject.create('User signed out');
  }
}
