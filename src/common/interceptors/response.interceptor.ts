// src/common/interceptors/response.interceptor.ts

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                // 統一回傳格式
                return {
                    statusCode: 200,
                    success: true,
                    timestamp: new Date().toISOString(),
                    path: context.switchToHttp().getRequest().url,
                    data
                };
            })
        );
    }
}
