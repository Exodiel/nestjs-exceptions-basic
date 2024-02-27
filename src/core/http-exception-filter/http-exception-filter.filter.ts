/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilterFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const responseBody = {
      header: {
        timestamp: new Date().toISOString(),
        severity: status > 200 ? 'INFO' : 'ERROR',
        errorCode: '000',
        errorMsg: exception instanceof HttpException ? exception.message : 'Error'
      },
      data: {}
    };
    response
      .status(status)
      .json(responseBody);
  }
}
