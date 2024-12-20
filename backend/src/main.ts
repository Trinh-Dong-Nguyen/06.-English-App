import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { END_POINTS } from './utils/constants';
import { JwtAuthGuard } from './common/guards/at.guard';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import docs from './config/documentation';
import { RolesGuard } from './common/guards/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);
  const port = configService.get<number>('port');
  const env = configService.get<string>('env');
  const document = SwaggerModule.createDocument(app, docs, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    ignoreGlobalPrefix: true,
  });
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());
  app.setGlobalPrefix(END_POINTS.BASE);
  app.useGlobalGuards(new JwtAuthGuard(reflector, configService));
  app.useGlobalGuards(new RolesGuard(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  if (env === 'DEVELOPMENT') {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  SwaggerModule.setup('docs', app, document);
  await app.listen(port || 3001);
  console.log(`Server running on http://localhost:${port || 3001}/docs`);
}

bootstrap()
  .then(() => console.log('Server running'))
  .catch((e) => console.error(e));
