import { HttpException, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Teacher } from '../user/entities/teacher.entity';
import { Student } from '../user/entities/student.entity';
import { DataSource } from 'typeorm';
import { Request, Response } from 'express';
import { CognitoService } from './cognito.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly cognitoService: CognitoService,
  ) {}

  async create(user: User, username: string) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const res = await manager.save(user);
        await this.cognitoService.addUserToGroup(username, user.role);
        switch (user.role) {
          case 'TEACHER':
            const teacher = new Teacher();
            teacher.userInfo = user;
            await manager.save(teacher);
            break;
          case 'STUDENT':
            const student = new Student();
            student.userInfo = user;
            await manager.save(student);
            break;
          default:
            throw new Error('Invalid role');
        }
        return res;
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  setRefreshToken(response: Response, token: string) {
    response.cookie('refresh_token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  }

  getRefreshToken(request: Request) {
    return request.cookies['refresh_token'];
  }

  removeRefreshToken(response: Response) {
    response.clearCookie('refresh_token');
  }
}
