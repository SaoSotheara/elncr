import type { MigrationInterface, QueryRunner } from 'typeorm';
import { RoleEntity } from '../role/role.entity';

export class CreateDefaultUserRegistrationRole1696065970793
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleRepo = queryRunner.connection.getRepository(RoleEntity);
    const role = roleRepo.create({
      name: 'Normal User',
      description: 'Normal User',
      isSystem: true,
      isDefaultUserRegistration: true,
    });
    await roleRepo.save(role);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roleRepo = queryRunner.connection.getRepository(RoleEntity);
    const role = await roleRepo.findOne({
      where: { isDefaultUserRegistration: true },
    });
    if (role) {
      await roleRepo.delete(role.id);
    }
  }
}
