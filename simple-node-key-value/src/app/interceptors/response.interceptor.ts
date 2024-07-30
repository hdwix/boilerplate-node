import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Format success response
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode || HttpStatus.OK;
        const { message, ...rest } = data.data;

        if (data.data) {
          return {
            meta: {
              code: statusCode,
              message: message || 'Success',
            },
            data: rest,
          };
        }

        return {
          meta: {
            code: statusCode,
            message: message,
          },
          data: data,
        };
      }),
      catchError((error) => {
        const statusCode =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
          error.response?.message || error.message || 'Internal Server Error';

        return throwError(
          () =>
            new HttpException(
              {
                meta: {
                  code: statusCode,
                  message: message,
                },
              },
              statusCode,
            ),
        );
      }),
    );
  }
}
