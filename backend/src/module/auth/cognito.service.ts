import { createHmac } from 'crypto';
import {
  AdminAddUserToGroupCommand,
  AdminInitiateAuthCommand,
  AdminUserGlobalSignOutCommand,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  ResendConfirmationCodeCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterCognitoDto } from './dto/register-cognito.dto';
import { SignInCognitoDto } from './dto/sign-in-cognito.dto';
import { ConfirmSignUpDto } from './dto/confirm-sign-up.dto';
import { ConfigService } from '@nestjs/config';
import { AUTH_FLOW } from '../../utils/constants';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfirmForgotPasswordDto } from './dto/confirm-forgot-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResendConfirmationCodeDto } from './dto/resend-confirmation-code.dto';

@Injectable()
export class CognitoService {
  private cognitoClient: CognitoIdentityProviderClient;
  private readonly userPoolId: string;
  private readonly clientId: string;
  private readonly cognitoDomain: string;
  private readonly cognitoRedirectUri: string;
  private readonly cognitoClientSecret: string;
  private readonly client: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.userPoolId = this.configService.get<string>('userPoolId');
    this.clientId = this.configService.get<string>('audience');
    this.cognitoDomain = this.configService.get<string>('cognitoDomain');
    this.cognitoClientSecret = this.configService.get<string>(
      'cognitoClientSecret',
    );
    this.client = this.configService.get<string>('client');
    this.cognitoRedirectUri =
      this.configService.get<string>('cognitoRedirectUri');
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.configService.get<string>('region'),
      credentials: {
        accessKeyId: this.configService.get<string>('accessKeyId'),
        secretAccessKey: this.configService.get<string>('secretAccessKey'),
      },
    });
  }

  getSecretHash(username: string) {
    const hasher = createHmac('sha256', this.cognitoClientSecret);
    hasher.update(`${username}${this.clientId}`);
    return hasher.digest('base64');
  }

  handleError(error: any, action: string) {
    const errorMessage = error.message || 'An unexpected error occurred';
    throw new BadRequestException(`Failed to ${action}: ${errorMessage}`);
  }

  async signUp(registerCognitoDto: RegisterCognitoDto) {
    const command = new SignUpCommand({
      ClientId: this.clientId,
      Username: registerCognitoDto.username,
      Password: registerCognitoDto.password,
      SecretHash: this.getSecretHash(registerCognitoDto.username),
      UserAttributes: [
        {
          Name: 'email',
          Value: registerCognitoDto.email,
        },
        {
          Name: 'name',
          Value: registerCognitoDto.name,
        },
      ],
    });

    try {
      const response = await this.cognitoClient.send(command);
      return response.UserSub;
    } catch (error) {
      if (error.code === 'UsernameExistsException') {
        throw new ForbiddenException('Username already exists');
      }
      if (error.code === 'InvalidPasswordException') {
        throw new BadRequestException(
          'Password must have uppercase, lowercase, number, and special character',
        );
      }
      this.handleError(error, 'sign up');
    }
  }

  async signIn(cognitoSignInDto: SignInCognitoDto) {
    const command = new AdminInitiateAuthCommand({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
      AuthFlow: AUTH_FLOW,

      AuthParameters: {
        USERNAME: cognitoSignInDto.username,
        PASSWORD: cognitoSignInDto.password,
        SECRET_HASH: this.getSecretHash(cognitoSignInDto.username),
      },
    });

    try {
      const response = await this.cognitoClient.send(command);
      const accessToken = response.AuthenticationResult.AccessToken;
      const refreshToken = response.AuthenticationResult.RefreshToken;
      const idToken = response.AuthenticationResult.IdToken;
      const decodedToken = this.decodeJwt(idToken);

      const isEmailVerified = decodedToken.email_verified;
      return { accessToken, refreshToken, isEmailVerified };
    } catch (error) {
      if (error.code === 'UserNotFoundException') {
        throw new NotFoundException('User not found');
      }
      if (error.code === 'NotAuthorizedException') {
        throw new UnauthorizedException('Invalid credentials');
      }
      this.handleError(error, 'sign in');
    }
  }

  redirectUrl(res: Response, provider: string) {
    const authUrl = `${this.cognitoDomain}/oauth2/authorize?identity_provider=${provider}&client_id=${this.clientId}&response_type=code&redirect_uri=${this.cognitoRedirectUri}&scope=email+public_profile`;
    console.log(authUrl);
    res.redirect(authUrl);
  }

  async handleOauth(code: string) {
    try {
      const tokenResponse = await firstValueFrom(
        this.httpService
          .post(
            `${this.cognitoDomain}/oauth2/token`,
            new URLSearchParams({
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: this.cognitoRedirectUri,
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                  'Basic ' +
                  Buffer.from(
                    `${this.clientId}:${this.cognitoClientSecret}`,
                  ).toString('base64'),
              },
            },
          )
          .pipe(
            catchError((error) => {
              throw new BadRequestException(error.response);
            }),
          ),
      );
      const accessToken = tokenResponse.data.access_token;
      const refreshToken = tokenResponse.data.refresh_token;
      const userInfoResponse = await firstValueFrom(
        this.httpService.get(`${this.cognitoDomain}/oauth2/userInfo`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );
      const userInfo = userInfoResponse.data;
      return { userInfo, accessToken, refreshToken };
    } catch (error) {
      this.handleError(error, 'sign in with OAuth');
    }
  }

  async addUserToGroup(username: string, groupName: string) {
    const command = new AdminAddUserToGroupCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      GroupName: groupName,
    });

    try {
      await this.cognitoClient.send(command);
    } catch (error) {
      if (error.code === 'UserNotFoundException') {
        throw new NotFoundException('User not found');
      }
      if (error.code === 'GroupNotFoundException') {
        throw new NotFoundException('Group not found');
      }
      if (error.code === 'ResourceNotFoundException') {
        throw new NotFoundException('Resource not found');
      }
      this.handleError(error, 'add user to group');
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const tokenResponse = await firstValueFrom(
        this.httpService
          .post(
            `${this.cognitoDomain}/oauth2/token`,
            new URLSearchParams({
              grant_type: 'refresh_token',
              client_id: this.clientId,

              refresh_token: refreshToken,
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                  'Basic ' +
                  Buffer.from(
                    `${this.clientId}:${this.cognitoClientSecret}`,
                  ).toString('base64'),
              },
            },
          )
          .pipe(
            catchError((error) => {
              throw new BadRequestException(error.response);
            }),
          ),
      );
      return tokenResponse.data.access_token;
    } catch (error) {
      this.handleError(error, 'refresh access token');
    }
  }

  async confirmSignUp(confirmationCode: ConfirmSignUpDto) {
    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      Username: confirmationCode.username,
      SecretHash: this.getSecretHash(confirmationCode.username),
      ConfirmationCode: confirmationCode.code,
    });

    try {
      return await this.cognitoClient.send(command);
    } catch (error) {
      this.handleError(error, 'confirm sign up');
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const command = new ForgotPasswordCommand({
      ClientId: this.clientId,
      Username: forgotPasswordDto.username,
      SecretHash: this.getSecretHash(forgotPasswordDto.username),
    });
    try {
      return await this.cognitoClient.send(command);
    } catch (error) {
      this.handleError(error, 'forgot password');
    }
  }

  async confirmForgotPassword(
    conFirmForgotPasswordDto: ConfirmForgotPasswordDto,
  ) {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: this.clientId,
      Username: conFirmForgotPasswordDto.username,
      ConfirmationCode: conFirmForgotPasswordDto.confirmationCode,
      Password: conFirmForgotPasswordDto.newPassword,
      SecretHash: this.getSecretHash(conFirmForgotPasswordDto.username),
    });

    try {
      return await this.cognitoClient.send(command);
    } catch (error) {
      this.handleError(error, 'confirm forgot password');
    }
  }

  async resendConfirmationCode(
    resendConfirmationCodeDto: ResendConfirmationCodeDto,
  ) {
    const command = new ResendConfirmationCodeCommand({
      ClientId: this.clientId,
      Username: resendConfirmationCodeDto.username,
      SecretHash: this.getSecretHash(resendConfirmationCodeDto.username),
    });

    try {
      return await this.cognitoClient.send(command);
    } catch (error) {
      this.handleError(error, 'resend confirmation code');
    }
  }

  async signOut(username: string) {
    const command = new AdminUserGlobalSignOutCommand({
      UserPoolId: this.userPoolId,
      Username: username,
    });

    try {
      return await this.cognitoClient.send(command);
    } catch (error) {
      this.handleError(error, 'sign out');
    }
  }

  private decodeJwt(token: string): any {
    const [, payload] = token.split('.');
    const decodedPayload = Buffer.from(payload, 'base64').toString();
    return JSON.parse(decodedPayload);
  }
}
