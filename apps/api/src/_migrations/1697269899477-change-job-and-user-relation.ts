import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeJobAndUserRelation1697269899477
  implements MigrationInterface
{
  name = 'ChangeJobAndUserRelation1697269899477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP COLUMN "application_target "`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "application_target" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__users__user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "rc_jobs__user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__users__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__users__user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "rc_jobs__user_id" UNIQUE ("user_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__users__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP COLUMN "application_target"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "application_target " character varying NOT NULL`
    );
  }
}
