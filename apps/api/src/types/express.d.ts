import type { UserEntity } from '../user/user.entity';
import type { SessionEntity } from '../session/session.entity';
import type { DecodedIdToken } from 'firebase-admin/lib/auth';

declare global {
  namespace Express {
    interface Request {
      currentSession: {
        session: SessionEntity;
        user: UserEntity;
        decodedToken: DecodedIdToken;
      };
    }
  }
}
