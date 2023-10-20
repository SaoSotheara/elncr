import type { MigrationInterface, QueryRunner } from 'typeorm';
import {
  PermissionSeed,
  RollbackPermissionSeed,
} from '../common/utils/permission-seed.utils';
import { JobEntity } from '../job/job.entity';

export class AddPermissionsForJobResource1697268746702
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await PermissionSeed(queryRunner, JobEntity);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await RollbackPermissionSeed(queryRunner, JobEntity);
  }
}
