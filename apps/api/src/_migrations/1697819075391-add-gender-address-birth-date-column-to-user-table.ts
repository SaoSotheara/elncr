import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGenderAddressBirthDateColumnToUserTable1697819075391
  implements MigrationInterface
{
  name = 'AddGenderAddressBirthDateColumnToUserTable1697819075391';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "gender" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "address" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "birth_date" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birth_date"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
  }
}
