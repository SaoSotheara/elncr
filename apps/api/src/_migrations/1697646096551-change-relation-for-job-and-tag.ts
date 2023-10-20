import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRelationForJobAndTag1697646096551
  implements MigrationInterface
{
  name = 'ChangeRelationForJobAndTag1697646096551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_tags" ("job_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "pk_job_tags__job_id__tag_id" PRIMARY KEY ("job_id", "tag_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "idx_job_tags__job_id" ON "job_tags" ("job_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "idx_job_tags__tag_id" ON "job_tags" ("tag_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "job_tags" ADD CONSTRAINT "fk_job_tags__jobs__job_id" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "job_tags" ADD CONSTRAINT "fk_job_tags__tags__tag_id" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_tags" DROP CONSTRAINT "fk_job_tags__tags__tag_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_tags" DROP CONSTRAINT "fk_job_tags__jobs__job_id"`
    );
    await queryRunner.query(`DROP INDEX "public"."idx_job_tags__tag_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_job_tags__job_id"`);
    await queryRunner.query(`DROP TABLE "job_tags"`);
  }
}
