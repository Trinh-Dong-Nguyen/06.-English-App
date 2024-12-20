import {
  HttpException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { CourseBuying } from './entities/course-buying.entity';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as crypto from 'crypto';
import * as qs from 'qs';
import { Student } from '../user/entities/student.entity';
import { User } from '../user/entities/user.entity';
import { randomBytes } from 'crypto';
import { Course } from '../course/entities/course.entity';
import { formatDateToVnpCreateDate, sortObject } from 'src/utils/vnpay.utils';
import { CheckKeyDto } from './dto/check-key.dto';
import { CourseOwning } from '../course-owning/entities/course-owning.entity';
import { LessonProgress } from '../course-owning/entities/lesson-progress.entity';
import { SectionProgress } from '../course-owning/entities/section-progress.entity';

@Injectable()
export class CourseBuyingService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly config: ConfigService,
  ) {}

  async create(
    courseBuying: CourseBuying,
    courseId: string,
    awsCognitoId: string,
  ) {
    try {
      const user = await this.dataSource.getRepository(User).findOneOrFail({
        where: { awsCognitoId: awsCognitoId },
      });
      const student = await this.dataSource
        .getRepository(Student)
        .createQueryBuilder('student')
        .leftJoin('student.userInfo', 'userInfo')
        .select(['student'])
        .where('userInfo.id = :id', { id: user.id })
        .getOne();
      if (!student) {
        throw new HttpException('Student not found', 404);
      }
      const course = await this.dataSource.getRepository(Course).findOneOrFail({
        where: { id: courseId },
      });
      if (!course) {
        throw new HttpException('Course not found', 404);
      }
      courseBuying.course = course;
      courseBuying.student = student;
      courseBuying.key = randomBytes(4).toString('hex');
      const newCourseBuying = await this.dataSource
        .getRepository(CourseBuying)
        .insert(courseBuying);
      return newCourseBuying;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }

  async createPayOrderUrl(@Req() req: Request, courseBuyingId: string) {
    try {
      const courseBuying = await this.dataSource
        .getRepository(CourseBuying)
        .createQueryBuilder('courseBuying')
        .leftJoin('courseBuying.course', 'course')
        .select(['courseBuying', 'course'])
        .where('courseBuying.id = :id', { id: courseBuyingId })
        .getOne();
      if (!courseBuying) {
        throw new HttpException('Course buying not found', 404);
      }
      const vnpReturnurl = this.config.get<string>('vnpayReturnUrl');
      let vnpUrl = this.config.get<string>('vnpayUrl');
      const vnpTmnCode = this.config.get<string>('vnpTmnCode');
      const vnpHashSecret = this.config.get<string>('vnpHashSecret');
      const orderId = courseBuying.id;
      const now = new Date();
      const vnpCreateDate = formatDateToVnpCreateDate(now);
      const vnpIpAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;
      // const vnpIpAddr = this.config.get<string>('ipAddress');
      const vnpAmount = courseBuying.course.price;
      const vnpOrderInfo = 'Thanh toán khóa học ' + courseBuying.course.title;
      const vnpTxnRef = orderId;

      const gmt7Offset = 7 * 60;
      const localOffset = now.getTimezoneOffset();
      const gmt7Time = new Date(
        now.getTime() + (gmt7Offset + localOffset) * 60 * 1000,
      );

      gmt7Time.setMinutes(gmt7Time.getMinutes() + 15);

      const vnpExpireDate = formatDateToVnpCreateDate(gmt7Time);
      let vnp_Params = {};
      vnp_Params['vnp_Version'] = '2.1.0';
      vnp_Params['vnp_Command'] = 'pay';
      vnp_Params['vnp_TmnCode'] = vnpTmnCode;
      // vnp_Params['vnp_Merchant'] = ''
      vnp_Params['vnp_Locale'] = 'vn';
      vnp_Params['vnp_CurrCode'] = 'VND';
      vnp_Params['vnp_TxnRef'] = vnpTxnRef;
      vnp_Params['vnp_OrderInfo'] = vnpOrderInfo;
      vnp_Params['vnp_Amount'] = vnpAmount * 100;
      vnp_Params['vnp_ReturnUrl'] = vnpReturnurl;
      vnp_Params['vnp_IpAddr'] = vnpIpAddr;
      vnp_Params['vnp_CreateDate'] = vnpCreateDate;
      vnp_Params['vnp_OrderType'] = 'other';
      vnp_Params['vnp_ExpireDate'] = vnpExpireDate;
      vnp_Params = sortObject(vnp_Params);
      const signData: string = qs.stringify(vnp_Params);
      const hmac = crypto.createHmac('sha512', vnpHashSecret);
      const signed: string = hmac
        .update(Buffer.from(signData, 'utf-8'))
        .digest('hex');
      vnp_Params['vnp_SecureHash'] = signed;
      vnpUrl += '?' + qs.stringify(vnp_Params);
      return vnpUrl;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }

  async ipnVnpayUrl(query: any, res: Response) {
    let vnp_Params = query;
    const secureHash = vnp_Params['vnp_SecureHash'];
    const orderId = vnp_Params['vnp_TxnRef'];
    const rspCode = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    const vnpHashSecret = this.config.get<string>('vnpHashSecret');
    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', vnpHashSecret);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    const paymentStatus = '0';
    let checkOrderId = true;
    const order = await this.dataSource
      .getRepository(CourseBuying)
      .createQueryBuilder('courseBuying')
      .leftJoin('courseBuying.course', 'course')
      .select(['courseBuying', 'course'])
      .where('courseBuying.id = :id', { id: orderId })
      .getOne();
    if (!order) {
      checkOrderId = false;
    }
    const checkAmount =
      order.course.price === vnp_Params['vnp_Amout'] / 100 ? true : false; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if (secureHash === signed) {
      if (checkOrderId) {
        if (checkAmount) {
          if (paymentStatus == '0') {
            if (rspCode == '00') {
              order.active = true;
              await this.dataSource.getRepository(CourseBuying).save(order);
              res.status(200).json({ RspCode: '00', Message: 'Success' });
            } else {
              res.status(200).json({ RspCode: '00', Message: 'Success' });
            }
          } else {
            res.status(200).json({
              RspCode: '02',
              Message: 'This order has been updated to the payment status',
            });
          }
        } else {
          res.status(200).json({ RspCode: '04', Message: 'Amount invalid' });
        }
      } else {
        res.status(200).json({ RspCode: '01', Message: 'Order not found' });
      }
    } else {
      res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
    }
  }

  async validatePayOrder(query: any) {
    let vnp_Params = query;
    const courseBuyingId = vnp_Params['vnp_TxnRef'];
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params = sortObject(vnp_Params);
    const vnpHashSecret = this.config.get<string>('vnpHashSecret');
    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', vnpHashSecret);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    const courseBuying = await this.dataSource
      .getRepository(CourseBuying)
      .findOne({
        where: { id: courseBuyingId },
      });
    if (secureHash === signed) {
      return {
        message: 'Success',
        code: vnp_Params['vnp_ResponseCode'],
        courseBuying: courseBuying,
      };
    } else {
      return { message: 'Pay fail', code: '97' };
    }
  }
  async checkKey(checkKeyDto: CheckKeyDto, userAwsId: string) {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const courseBuying = await transactionalEntityManager
        .getRepository(CourseBuying)
        .createQueryBuilder('courseBuying')
        .leftJoin('courseBuying.course', 'course')
        .leftJoin('courseBuying.student', 'student')
        .leftJoin('student.userInfo', 'userInfo')
        .select([
          'courseBuying.id',
          'courseBuying.key',
          'course.id',
          'student.id',
          'userInfo.awsCognitoId',
        ])
        .where('courseBuying.id = :courseBuyingId', {
          courseBuyingId: checkKeyDto.courseBuyingId,
        })
        .andWhere('userInfo.awsCognitoId = :userAwsId', {
          userAwsId: userAwsId,
        })
        .andWhere('courseBuying.key = :key', { key: checkKeyDto.key })
        .getOne();

      if (!courseBuying) {
        throw new NotFoundException('Course buying not found');
      }
      const existingCourseOwning = await transactionalEntityManager
        .getRepository(CourseOwning)
        .createQueryBuilder('courseOwning')
        .leftJoinAndSelect('courseOwning.student', 'student')
        .leftJoinAndSelect('courseOwning.course', 'course')
        .where('student.id = :studentId', {
          studentId: courseBuying.student.id,
        })
        .andWhere('course.id = :courseId', { courseId: courseBuying.course.id })
        .getOne();
      if (existingCourseOwning) {
        await transactionalEntityManager
          .getRepository(CourseOwning)
          .remove(existingCourseOwning);
      }
      const newCourseOwningId = await transactionalEntityManager
        .getRepository(CourseOwning)
        .insert({
          course: { id: courseBuying.course.id },
          student: { id: courseBuying.student.id },
          active: true,
          expiredDate: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1),
          ),
        });
      const newCourseOwning = await transactionalEntityManager
        .getRepository(CourseOwning)
        .createQueryBuilder('courseOwning')
        .leftJoinAndSelect('courseOwning.student', 'student')
        .leftJoinAndSelect('courseOwning.course', 'course')
        .leftJoinAndSelect('course.lessons', 'lessons')
        .leftJoinAndSelect('lessons.sections', 'sections')
        .where('courseOwning.id = :id', {
          id: newCourseOwningId.identifiers[0].id,
        })
        .getOne();

      await Promise.all(
        newCourseOwning.course.lessons.map(async (lesson) => {
          const newLessonProgress = await transactionalEntityManager
            .getRepository(LessonProgress)
            .save({
              courseOwning: newCourseOwning,
              lesson: lesson,
            });
          await Promise.all(
            lesson.sections.map(async (section) => {
              await transactionalEntityManager
                .getRepository(SectionProgress)
                .save({
                  lessonProgress: newLessonProgress,
                  courseOwning: newCourseOwning,
                  section: section,
                });
            }),
          );
        }),
      );
      return newCourseOwning;
    });
  }
}
