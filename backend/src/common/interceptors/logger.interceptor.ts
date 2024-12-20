import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers, ip } = request;

    console.log(`Incoming Request:`);
    console.log(`Method: ${method}`);
    console.log(`URL: ${url}`);
    console.log(`User Agent: ${headers['user-agent']}`);
    console.log(`IP: ${ip}`);
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        console.log(`Outgoing Response:`);
        console.log(`Status Code: ${statusCode}`);
        console.log(`Response Time: ${Date.now() - now}ms`);
      }),
      map((data) => {
        console.log('Response Body:', data);
        return data;
      }),
    );
  }
}
