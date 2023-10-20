import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

export class SessionResponse {
  @ApiProperty()
  apiInvocationCount: number;

  @ApiProperty()
  lastAccessAt: Date;

  @ApiProperty()
  expiresAt: Date;

  @ApiProperty()
  user: UserEntity;
}
