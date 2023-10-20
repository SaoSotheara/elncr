import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import type { Request } from 'express';
import type { Observable } from 'rxjs';

/**
 * Add createdByUserId or updatedByUserId to create and update dto
 */
@Injectable()
export class AuditorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> | Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<Request>();
    const auditor = request.currentSession.user;

    delete request.body.createdBy;
    delete request.body.updatedBy;
    delete request.body.createdByUserId;
    delete request.body.updatedByUserId;

    if (request.method === 'POST') {
      request.body.createdByUserId = auditor?.id;
    } else if (request.method === 'PUT' || request.method === 'PATCH') {
      request.body.updatedByUserId = auditor?.id;
    }

    return next.handle();
  }
}
