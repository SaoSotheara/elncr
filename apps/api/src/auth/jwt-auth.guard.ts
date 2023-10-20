import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('firebase-auth-jwt') {
  constructor() {
    super({ property: 'currentSession' });
  }
}
