import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSlugColumnToLevelAndJobTypeTable1697262427322
  implements MigrationInterface
{
  name = 'AddSlugColumnToLevelAndJobTypeTable1697262427322';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_types" ADD "slug" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "job_types" ADD CONSTRAINT "uc_job_types__slug" UNIQUE ("slug")`
    );
    await queryRunner.query(
      `ALTER TABLE "levels" ALTER COLUMN "description" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "job_types" ALTER COLUMN "description" DROP NOT NULL`
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_types" ALTER COLUMN "description" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "levels" ALTER COLUMN "description" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "job_types" DROP CONSTRAINT "uc_job_types__slug"`
    );
    await queryRunner.query(`ALTER TABLE "job_types" DROP COLUMN "slug"`);
  }
}
