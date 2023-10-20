import type { QueryRunner } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { generatePermissionsForEntity } from '../common/utils/permission.utils';
import { RoleEntity } from '../role/role.entity';
import { DEFAULT_SUPER_ADMIN_ROLE_NAME } from '../role/role.constant';
import { getFirebaseAdminAuth } from '../firebase-admin.utils';

export class InitiateSuperAdmin1696606917304 {
  public async up(queryRunner: QueryRunner) {
    const permissionsForUserResource = generatePermissionsForEntity(
      queryRunner,
      UserEntity
    );
    const permissionsForRoleResource = generatePermissionsForEntity(
      queryRunner,
      RoleEntity
    );

    const permissions = await queryRunner.manager.save([
      ...permissionsForUserResource,
      ...permissionsForRoleResource,
    ]);

    // filter only manage:* permissions
    const managePermissions = permissions.filter((permission) =>
      permission.actionResource.startsWith('manage:')
    );

    const role = await queryRunner.manager.save(
      queryRunner.manager.create(RoleEntity, {
        isSystem: true,
        name: DEFAULT_SUPER_ADMIN_ROLE_NAME,
        permissions: managePermissions,
      })
    );

    const adminSdk = getFirebaseAdminAuth();

    const admin = await adminSdk.createUser({
      email: process.env.FIREBASE_ADMIN_ACCOUNT_USER_SEED,
      password: process.env.FIREBASE_ADMIN_ACCOUNT_PASSWORD_SEED,
    });

    await queryRunner.manager.save(
      queryRunner.manager.create(UserEntity, {
        email: admin.email,
        roles: [role],
        id: admin.uid,
      })
    );
  }
}
