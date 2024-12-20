import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc, ClientRedis } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  ApplyDiscountRequest,
  CreateDiscountRequest,
  DisableDiscountRequest,
  DISCOUNT_SERVICE_NAME,
  DiscountServiceClient,
  GetDiscountByCourseRequest,
  GetDiscountsByOwnerRequest,
  UpdateDiscountRequest,
} from '../../types/discount';
import { INJECTION_DEPS } from '../../utils/constants';

@Injectable()
export class DiscountService {
  private discountService: DiscountServiceClient;
  private discount_service = DISCOUNT_SERVICE_NAME;

  constructor(
    @Inject(INJECTION_DEPS.DISCOUNT_PACKAGE) private client: ClientGrpc,
    @Inject(INJECTION_DEPS.PUB_SUB_SERVICE) private pubSubClient: ClientRedis,
  ) {
    this.discountService = this.client.getService<DiscountServiceClient>(
      this.discount_service,
    );
  }

  async getDiscountsByOwnerId(
    disCountByCourseRequest: GetDiscountsByOwnerRequest,
  ) {
    return await firstValueFrom(
      this.discountService.getDiscountsByOwner(disCountByCourseRequest),
    );
  }

  async getDiscountsByCourseId(
    disCountByCourseRequest: GetDiscountByCourseRequest,
  ) {
    return await firstValueFrom(
      this.discountService.getDiscountByCourse(disCountByCourseRequest),
    );
  }

  async createDiscount(discount: CreateDiscountRequest) {
    await firstValueFrom(this.pubSubClient.emit('createDiscount', discount));
    return {
      status: 'Discount created successfully',
    };
  }

  async updateDiscount(discount: UpdateDiscountRequest) {
    return await firstValueFrom(this.discountService.updateDiscount(discount));
  }

  async disableDiscount(discount: DisableDiscountRequest) {
    return await firstValueFrom(this.discountService.disableDiscount(discount));
  }

  async applyDiscount(discount: ApplyDiscountRequest) {
    return await firstValueFrom(this.discountService.applyDiscount(discount));
  }
}
