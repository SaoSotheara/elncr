import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSampleTags1697268746703 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "tags" ("name", "slug", "created_at", "updated_at", "version")
      VALUES ('Full Time', 'full-time', now(), now(), 1),
              ('Part Time', 'part-time', now(), now(), 1),
              ('Contract', 'contract', now(), now(), 1),
              ('Freelance', 'freelance', now(), now(), 1),
              ('Internship', 'internship', now(), now(), 1),
              ('Temporary', 'temporary', now(), now(), 1),
              ('Volunteer', 'volunteer', now(), now(), 1),
              ('Other', 'other', now(), now(), 1);
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // do nothing
  }
}
