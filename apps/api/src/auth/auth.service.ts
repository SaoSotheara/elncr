import { Injectable } from '@nestjs/common';
import { SessionService } from '../session/session.service';
import { UserService } from '../user/user.service';
import type { SessionEntity } from '../session/session.entity';
import type { SignUpSessionPayload } from './firebase-jwt-strategy.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService
  ) {}

  logout(session: SessionEntity) {
    return this.sessionService.deleteSession(session);
  }

  completeSignUp(session: SignUpSessionPayload) {
    return this.userService.completeSignUp(session);
  }
}
