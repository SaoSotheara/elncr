import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeJobAndLevelRelation1697270182218
  implements MigrationInterface
{
  name = 'ChangeJobAndLevelRelation1697270182218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__levels__level_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "rc_jobs__level_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__levels__level_id" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__levels__level_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "rc_jobs__level_id" UNIQUE ("level_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__levels__level_id" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
