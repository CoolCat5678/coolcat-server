import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                const request = context.switchToHttp().getRequest();

                const status =
                    err instanceof HttpException
                        ? err.getStatus()
                        : HttpStatus.INTERNAL_SERVER_ERROR;

                const message =
                    err instanceof HttpException
                        ? err.getResponse()
                        : 'Internal server error';

                const errorResponse = {
                    statusCode: status,
                    success: false,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    error: typeof message === 'string' ? message : (message as any).message || message,
                };

                return throwError(() => new HttpException(errorResponse, status));
            })
        );
    }
}
