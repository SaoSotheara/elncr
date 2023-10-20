import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { CommonEntity } from '../common/entities/common.entity';
import { UserEntity } from '../user/user.entity';

@Entity()
export class UploadEntity extends CommonEntity {
  @Column()
  url: string;

  @Column()
  type: string;

  @ManyToOne(() => UserEntity, (user) => user.uploads)
  user: Relation<UserEntity>;

  @Column()
  userId: string;
}
