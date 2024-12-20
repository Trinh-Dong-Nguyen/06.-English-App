import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DOCUMENTATION, END_POINTS } from '../../utils/constants';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetDiscountsByCourseDto } from './dto/getDiscountsByCourse.dto';
import { ResponseObject } from '../../utils/objects';
import { User } from '../../common/decorators/user.decorator';
import { IUser } from '../../common/guards/at.guard';
import { CreateDiscountRequest } from './dto/create-discount.dto';
import { updateDiscountRequest } from './dto/update-discount.dto';
import { disableDiscountRequest } from './dto/disable-discount.dto';

@ApiBearerAuth()
@ApiTags(DOCUMENTATION.TAGS.DISCOUNT)
@Controller(END_POINTS.DISCOUNT.BASE)
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get(END_POINTS.DISCOUNT.GET_ALL_DISCOUNTS_BY_OWNER)
  @ApiOperation({ summary: 'Get all discounts by owner' })
  getDiscountsByOwnerId(@User() user: IUser) {
    return this.discountService.getDiscountsByOwnerId({
      ownerId: user.userAwsId,
    });
  }

  @Get(END_POINTS.DISCOUNT.GET_ALL_DISCOUNTS_BY_COURSE)
  @ApiOperation({ summary: 'Get all discounts by course' })
  async getDiscountsByCourseId(@Param() request: GetDiscountsByCourseDto) {
    const res = await this.discountService.getDiscountsByCourseId(request);
    return ResponseObject.create('Get Discounts Successful', res);
  }

  @Post(END_POINTS.DISCOUNT.CREATE)
  @ApiOperation({ summary: 'Create a new discount' })
  async createDiscount(
    @Body() request: CreateDiscountRequest,
    @User() user: IUser,
  ) {
    const res = await this.discountService.createDiscount({
      ...request,
      ownerId: user.userAwsId,
    });
    return ResponseObject.create('Create Discount Successful', res);
  }

  @Post(END_POINTS.DISCOUNT.UPDATE)
  @ApiOperation({ summary: 'Update a discount' })
  async updateDiscount(
    @Body() request: updateDiscountRequest,
    @User() user: IUser,
  ) {
    const res = await this.discountService.updateDiscount({
      ...request,
      ownerId: user.userAwsId,
    });
    return ResponseObject.create('Update Discount Successful', res);
  }

  @Post(END_POINTS.DISCOUNT.DISABLE_DISCOUNT)
  @ApiOperation({ summary: 'Disable a discount' })
  async disableDiscount(@Body() request: disableDiscountRequest) {
    const res = await this.discountService.disableDiscount(request);
    return ResponseObject.create('Disable Discount Successful', res);
  }
}
