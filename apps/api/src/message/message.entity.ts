import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CommonEntity } from '../common/entities/common.entity';

@Entity()
export class MessageEntity extends CommonEntity {
  @Column()
  content: string;

  @Column()
  isRead: boolean;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  author: Relation<UserEntity>;

  @Column()
  authorId: string;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  recipient: Relation<UserEntity>;

  @Column()
  recipientId: string;
}
