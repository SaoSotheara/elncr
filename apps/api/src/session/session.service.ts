import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { SessionEntity } from './session.entity';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class SessionService extends TypeOrmCrudService<SessionEntity> {
  private readonly logger = new Logger(SessionService.name);
  constructor(
    @InjectRepository(SessionEntity)
    override readonly repo: Repository<SessionEntity>,
    @InjectRepository(UserEntity)
    readonly userRepo: Repository<UserEntity>
  ) {
    super(repo);
  }

  findOneByAccessToken(accessToken: string): Promise<SessionEntity> {
    return this.repo.findOne({
      where: { accessToken },
      relations: {
        user: true,
      },
    });
  }

  updateSession(session: SessionEntity): Promise<SessionEntity> {
    return this.repo.save(session);
  }

  async createSession(
    decodedIdToken: DecodedIdToken,
    accessToken: string
  ): Promise<SessionEntity> {
    console.log(decodedIdToken);
    const session = this.repo.create({
      accessToken: accessToken,
      createdByUserId: decodedIdToken.uid,
      expiresAt: new Date(decodedIdToken.exp),
    });
    const savedSession = await this.repo.save(session);
    savedSession.user = await this.userRepo.findOne({
      where: { id: decodedIdToken.uid },
    });
    return savedSession;
  }

  async deleteSession(session: SessionEntity): Promise<void> {
    await this.repo.delete(session.id);
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async deleteExpiresToken() {
    try {
      this.logger.debug('Start delete expires session');
      const result = await this.repo.delete({
        expiresAt: LessThanOrEqual(new Date()),
      });
      this.logger.debug(`Deleted ${result.affected} expires session`);
    } catch (err) {
      this.logger.error('Failed to delete expires session', err);
    }
  }
}
