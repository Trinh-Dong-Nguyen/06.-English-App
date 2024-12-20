import { Controller, Get, Post, Body, Req, Query, Res } from '@nestjs/common';
import { CourseBuyingService } from './course-buying.service';
import { CreateCourseBuyingDto } from './dto/create-course-buying.dto';
import { DOCUMENTATION, END_POINTS } from 'src/utils/constants';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CourseBuying } from './entities/course-buying.entity';
import { ResponseObject } from 'src/utils/objects';
import { Request, Response } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { IUser } from 'src/common/guards/at.guard';
import { VnpayIPNRequest } from './dto/vnpay-ipn.request.dto';
import { createPayOrderUrlDto } from './dto/create-pay-order-url.dto';
import { CheckKeyDto } from './dto/check-key.dto';

@ApiBearerAuth()
@ApiTags(DOCUMENTATION.TAGS.COURSE_BUYING)
@Controller(END_POINTS.COURSE_BUYING.BASE)
@ApiTags(DOCUMENTATION.TAGS.COURSE_BUYING)
export class CourseBuyingController {
  constructor(
    private readonly courseBuyingService: CourseBuyingService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post(END_POINTS.COURSE_BUYING.CREATE)
  @ApiOperation({ summary: 'Create course buying' })
  async create(
    @Body() createCourseBuyingDto: CreateCourseBuyingDto,
    @User() user: IUser,
  ) {
    const courseBuying = this.mapper.map(
      createCourseBuyingDto,
      CreateCourseBuyingDto,
      CourseBuying,
    );
    const result = await this.courseBuyingService.create(
      courseBuying,
      createCourseBuyingDto.courseId,
      user.userAwsId,
    );
    return ResponseObject.create('CourseBuying created successfully', result);
  }
  @ApiOperation({ summary: 'Create pay order url' })
  @Post(END_POINTS.COURSE_BUYING.CREATE_PAY_ORDER_URL)
  async createPayOrderUrl(
    @Req() req: Request,
    @Body() body: createPayOrderUrlDto,
  ) {
    const result = await this.courseBuyingService.createPayOrderUrl(
      req,
      body.courseBuyingId,
    );
    return ResponseObject.create('Pay order url created successfully', {
      result,
    });
  }
  @ApiOperation({ summary: 'Validate pay order' })
  @Post(END_POINTS.COURSE_BUYING.VALIDATE_PAY_ORDER)
  async validatePayOrder(@Query() query: VnpayIPNRequest) {
    const validationResult =
      await this.courseBuyingService.validatePayOrder(query);
    return ResponseObject.create(validationResult.message, {
      code: validationResult.code,
    });
  }
  @ApiOperation({ summary: 'IPN Vnpay Url' })
  @Get(END_POINTS.COURSE_BUYING.VNPAY_IPN)
  async ipnVnpayUrl(@Query() query: VnpayIPNRequest, @Res() res: Response) {
    return await this.courseBuyingService.ipnVnpayUrl(query, res);
  }
  @Post(END_POINTS.COURSE_BUYING.CHECK_KEY)
  async checkKey(@Body() body: CheckKeyDto, @User() user: IUser) {
    const result = await this.courseBuyingService.checkKey(
      body,
      user.userAwsId,
    );
    return ResponseObject.create('Check key successfully', result);
  }
}
