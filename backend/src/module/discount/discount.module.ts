import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { INJECTION_DEPS } from '../../utils/constants';
import { ConfigService } from '@nestjs/config';
import { DISCOUNT_PROTO_SERVICE_PACKAGE_NAME } from '../../types/discount';
import { join } from 'path';

interface RedisConfig {
  host: string;
  port: number;
}

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: INJECTION_DEPS.DISCOUNT_PACKAGE,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: DISCOUNT_PROTO_SERVICE_PACKAGE_NAME,
            protoPath: join(
              __dirname,
              '..',
              '..',
              'services/DiscountService',
              'Protos/discount.proto',
            ),
            url: configService.get<string>('grpcDiscountUrl'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: INJECTION_DEPS.PUB_SUB_SERVICE,
        useFactory: async (configService: ConfigService) => {
          const redis = configService.get<RedisConfig>('redis');
          return {
            transport: Transport.REDIS,
            options: {
              host: redis.host,
              port: redis.port,
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
