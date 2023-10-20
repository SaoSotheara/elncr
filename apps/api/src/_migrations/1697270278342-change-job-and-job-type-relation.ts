import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeJobAndJobTypeRelation1697270278342
  implements MigrationInterface
{
  name = 'ChangeJobAndJobTypeRelation1697270278342';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__job_types__job_type_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "rc_jobs__job_type_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__job_types__job_type_id" FOREIGN KEY ("job_type_id") REFERENCES "job_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__job_types__job_type_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "rc_jobs__job_type_id" UNIQUE ("job_type_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__job_types__job_type_id" FOREIGN KEY ("job_type_id") REFERENCES "job_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
