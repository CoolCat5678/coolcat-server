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
import { QueryFailedError } from 'typeorm';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                let status = HttpStatus.INTERNAL_SERVER_ERROR;
                let message: string | object = 'Internal server error';

                if (err instanceof HttpException) {
                    status = err.getStatus();
                    message = err.getResponse();
                } else if (err instanceof QueryFailedError) {
                    status = HttpStatus.BAD_REQUEST;
                    message = 'Database error: ' + err.message;
                }

                const errorResponse = {
                    statusCode: status,
                    success: false,
                    timestamp: new Date().toISOString(),
                    error: message
                };

                return throwError(() => new HttpException(errorResponse, status));
            })
        );
    }
}
