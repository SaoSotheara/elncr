import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobCandidateTable1697651826541
  implements MigrationInterface
{
  name = 'CreateJobCandidateTable1697651826541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_candidates" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_by_user_id" character varying, "updated_by_user_id" character varying, "state" "public"."entity_state_enum" NOT NULL DEFAULT 'active', "version" integer NOT NULL, "id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "job_id" integer NOT NULL, "cv_file_url" character varying NOT NULL, "cover_letter_file_url" character varying, "message" character varying, CONSTRAINT "pk_job_candidates__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "job_candidates" ADD CONSTRAINT "fk_job_candidates__users__created_by_user_id" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_candidates" ADD CONSTRAINT "fk_job_candidates__users__updated_by_user_id" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_candidates" ADD CONSTRAINT "fk_job_candidates__users__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_candidates" ADD CONSTRAINT "fk_job_candidates__jobs__job_id" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_candidates" DROP CONSTRAINT "fk_job_candidates__jobs__job_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_candidates" DROP CONSTRAINT "fk_job_candidates__users__user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_candidates" DROP CONSTRAINT "fk_job_candidates__users__updated_by_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_candidates" DROP CONSTRAINT "fk_job_candidates__users__created_by_user_id"`
    );
    await queryRunner.query(`DROP TABLE "job_candidates"`);
  }
}
