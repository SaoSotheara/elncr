import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';
import { FirebaseJwtStrategy } from './firebase-jwt-strategy.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [UserModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseJwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
