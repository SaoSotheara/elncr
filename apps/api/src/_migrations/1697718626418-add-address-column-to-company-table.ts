import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAddressColumnToCompanyTable1697718626418
  implements MigrationInterface
{
  name = 'AddAddressColumnToCompanyTable1697718626418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "address" character varying NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "address"`);
  }
}
