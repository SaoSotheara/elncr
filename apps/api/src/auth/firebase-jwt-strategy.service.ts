import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import type { Request } from 'express';
import type { JwtPayload } from '../common/interfaces/session-payload.interface';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/enums/error-code.enum';
import { SessionService } from '../session/session.service';
import type { SessionEntity } from '../session/session.entity';
import { FirebaseAuthenticationService } from '@open-lens/nestjs-firebase-admin';
import type { UserEntity } from '../user/user.entity';
import type { DecodedIdToken } from 'firebase-admin/lib/auth';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';

export type CurrentSessionPayload = {
  session: SessionEntity;
  user: UserEntity;
  decodedToken: DecodedIdToken;
};

export type SignUpSessionPayload = Omit<
  CurrentSessionPayload,
  'session' | 'user'
>;

@Injectable()
export class FirebaseJwtStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth-jwt'
) {
  constructor(
    private readonly sessionService: SessionService,
    private readonly firebaseAuthService: FirebaseAuthenticationService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    _payload: JwtPayload
  ): Promise<CurrentSessionPayload> {
    const extractJwt = ExtractJwt.fromAuthHeaderAsBearerToken();
    const accessToken = extractJwt(request);
    if (!accessToken) {
      throw new BusinessException({
        errorCode: ErrorCode.INVALID_CREDENTIALS,
        httpCode: HttpStatus.UNAUTHORIZED,
      });
    }

    let decodedToken: DecodedIdToken;
    let session = await this.sessionService.findOneByAccessToken(accessToken);
    if (!session) {
      try {
        decodedToken = await this.firebaseAuthService.verifyIdToken(
          accessToken,
          true
        );
      } catch (error) {
        throw new BusinessException({
          errorCode: ErrorCode.INVALID_ACCESS_TOKEN,
          httpCode: HttpStatus.UNAUTHORIZED,
        });
      }

      // todo: refactor this
      if (request.url.includes('complete-sign-up')) {
        return {
          session: null,
          user: null,
          decodedToken,
        };
      }

      session = await this.sessionService.createSession(
        decodedToken,
        accessToken
      );
    }

    session.lastAccessAt = new Date();
    const updatedSession = await this.sessionService.updateSession(session);
    return {
      session: updatedSession,
      user: updatedSession.user,
      decodedToken,
    };
  }
}
