import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import moment from 'moment-timezone';

@Catch() // captura qualquer exceção
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();

      message =
        (exceptionResponse.message as string) || exception.message || message;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss'),
    });
  }
}
