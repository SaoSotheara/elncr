import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageColumnToCompanyTable1697647400810
  implements MigrationInterface
{
  name = 'AddImageColumnToCompanyTable1697647400810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "image" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "image"`);
  }
}
