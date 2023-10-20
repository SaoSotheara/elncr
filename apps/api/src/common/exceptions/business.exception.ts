import type { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

interface BusinessExceptionOptions {
  errorCode: ErrorCode;
  httpCode: HttpStatus;
  message?: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  additionalData?: any;
}

export class BusinessException extends HttpException {
  constructor(options: BusinessExceptionOptions) {
    const { httpCode, ...response } = options;
    const responsePayload = {
      ...response,
      key: ErrorCode[options.errorCode],
      httpCode,
    };
    super(responsePayload, httpCode);
  }
}
