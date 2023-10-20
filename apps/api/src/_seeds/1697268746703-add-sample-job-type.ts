import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSampleJobType1697268746703 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "job_types" ("name", "slug", "created_at", "updated_at", "version")
      VALUES ('IT Support', 'it-support', now(), now(), 1),
              ('Software Engineer', 'software-engineer', now(), now(), 1),
              ('Web Developer', 'web-developer', now(), now(), 1),
              ('Mobile Developer', 'mobile-developer', now(), now(), 1),
              ('Data Scientist', 'data-scientist', now(), now(), 1),
              ('Data Analyst', 'data-analyst', now(), now(), 1),
              ('Data Engineer', 'data-engineer', now(), now(), 1),
              ('DevOps Engineer', 'devops-engineer', now(), now(), 1),
              ('Product Manager', 'product-manager', now(), now(), 1),
              ('UX Designer', 'ux-designer', now(), now(), 1),
              ('UI Designer', 'ui-designer', now(), now(), 1),
              ('QA Engineer', 'qa-engineer', now(), now(), 1),
              ('Business Analyst', 'business-analyst', now(), now(), 1),
              ('Sales', 'sales', now(), now(), 1),
              ('Marketing', 'marketing', now(), now(), 1),
              ('Finance', 'finance', now(), now(), 1),
              ('Human Resources', 'human-resources', now(), now(), 1),
              ('Other', 'other', now(), now(), 1);
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // do nothing
  }
}
