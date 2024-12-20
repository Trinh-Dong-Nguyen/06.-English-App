import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

export interface IUser {
  userAwsId: string;
  userName: string;
  roles: string[];
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private client: jwksClient.JwksClient;
  private readonly userPoolId: string;
  private readonly region: string;
  private readonly audience: string;
  private readonly cognitoClient: string;

  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {
    this.client = jwksClient({
      jwksUri:
        this.configService.get<string>('cognitoClient') +
        '/.well-known/jwks.json',
    });
    this.userPoolId = this.configService.get<string>('userPoolId');
    this.region = this.configService.get<string>('region');
    this.audience = this.configService.get<string>('audience');
    this.cognitoClient = this.configService.get<string>('cognitoClient');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    }

    try {
      const res = await this.verifyToken(token);
      request['user'] = {
        userAwsId: res.sub,
        userName: res.username,
        roles: res['cognito:groups'],
      } as IUser;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return null;
  }

  private async getSigningKey(kid: string): Promise<string> {
    const key = await this.client.getSigningKey(kid);
    return key.getPublicKey();
  }

  private async verifyToken(token: string): Promise<any> {
    const decodedHeader = jwt.decode(token, { complete: true }) as any;
    if (!decodedHeader || !decodedHeader.header) {
      throw new UnauthorizedException('Invalid token');
    }

    const kid = decodedHeader.header.kid;
    const signingKey = await this.getSigningKey(kid);
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        signingKey,
        {
          algorithms: ['RS256'],
          issuer: this.cognitoClient,
        },
        (err, decoded) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        },
      );
    });
  }
}
