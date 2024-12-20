import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './datasource/typeorm.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { SharedModule } from './module/shared.module';
import { minutes, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: minutes(1),
        limit: 15,
      },
    ]),

    SharedModule,
  ],
})
export class AppModule {}
