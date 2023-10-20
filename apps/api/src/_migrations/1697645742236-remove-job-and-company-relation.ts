import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveJobAndCompanyRelation1697645742236
  implements MigrationInterface
{
  name = 'RemoveJobAndCompanyRelation1697645742236';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "fk_jobs__companies__company_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "rc_jobs__company_id"`
    );
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "company_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jobs" ADD "company_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "rc_jobs__company_id" UNIQUE ("company_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "fk_jobs__companies__company_id" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
