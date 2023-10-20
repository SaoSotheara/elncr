import { Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RequiredAuth } from './decorators/required-auth.decorator';
import { CurrentSession } from './decorators/current-session.decorator';
import { ApiResource } from '../common/decorators/api-resource.decorator';
import { SignUpSessionPayload } from './firebase-jwt-strategy.service';
import { CurrentAuth } from './decorators/current-auth.decorator';
import { SessionEntity } from '../session/session.entity';

@ApiResource('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RequiredAuth()
  @Post('/complete-sign-up')
  completeSignUp(@CurrentAuth() session: SignUpSessionPayload) {
    return this.authService.completeSignUp(session);
  }

  @RequiredAuth()
  @Post('/logout')
  logout(@CurrentSession() session: SessionEntity) {
    return this.authService.logout(session);
  }
}
