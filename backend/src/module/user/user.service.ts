import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { USER_ROLES } from '../../utils/constants';
import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async findMe(awsId: string) {
    const user = await this.dataSource.getRepository(User).findOneOrFail({
      where: { awsCognitoId: awsId },
    });
    const additionalInfo = {} as any;
    if (user.role === USER_ROLES.STUDENT) {
      const student = await this.dataSource
        .getRepository(Student)
        .createQueryBuilder('student')
        .leftJoin('student.userInfo', 'userInfo')
        .select(['student.schoolName'])
        .where('userInfo.id = :userId', { userId: user.id })
        .getOne();
      additionalInfo.schoolName = student?.schoolName || '';
      return { ...user, additionalInfo };
    } else if (user.role === USER_ROLES.TEACHER) {
      const teacher = await this.dataSource
        .getRepository(Teacher)
        .createQueryBuilder('teacher')
        .leftJoin('teacher.userInfo', 'userInfo')
        .select(['teacher.degree'])
        .where('userInfo.id = :userId', { userId: user.id })
        .getOne();
      additionalInfo.degree = teacher?.degree || '';
      return { ...user, additionalInfo };
    }
    return user;
  }

  async getUserRole(awsId: string) {
    const user = await this.dataSource.getRepository(User).findOneOrFail({
      where: { awsCognitoId: awsId },
    });
    return user.role;
  }
}
