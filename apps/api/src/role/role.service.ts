import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { RoleEntity } from './role.entity';
import { PermissionEntity } from '../permission/permission.entity';
import type { CrudRequest } from '@open-lens/nestjs-crud';
import type { CreateRoleDto } from './dto/create-role.dto';
import type { UserEntity } from '../user/user.entity';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/enums/error-code.enum';
import type { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService extends TypeOrmCrudService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    override readonly repo: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>
  ) {
    super(repo);
  }

  async create(req: CrudRequest, dto: CreateRoleDto, user: UserEntity) {
    const exist = await this.repo.exist({ where: { name: dto.name } });
    if (exist) {
      throw new BusinessException({
        errorCode: ErrorCode.ROLE_ALREADY_EXISTS,
        httpCode: HttpStatus.CONFLICT,
      });
    }
    const permissions = await this.findPermissionsByIdsOrThrow(
      dto.permissionIds
    );
    return super.createOne(req, { ...dto, createdBy: user, permissions });
  }

  async update(req: CrudRequest, dto: UpdateRoleDto, user: UserEntity) {
    if (dto.name) {
      // check if name is duplicated but not with itself
      const id = req.parsed.paramsFilter[0].value;
      const existing = await this.repo
        .createQueryBuilder('role')
        .where('role.name = :name', { name: dto.name })
        .andWhere('role.id != :id', { id })
        .getExists();
      if (existing) {
        throw new BusinessException({
          errorCode: ErrorCode.ROLE_ALREADY_EXISTS,
          httpCode: HttpStatus.CONFLICT,
          additionalData: { name: dto.name },
        });
      }
    }
    if (dto.permissionIds) {
      const permissions = await this.findPermissionsByIdsOrThrow(
        dto?.permissionIds
      );
      return super.updateOne(req, {
        ...dto,
        permissions,
        updatedBy: user,
      });
    }
    return super.updateOne(req, { ...dto, updatedBy: user });
  }

  private async findPermissionsByIdsOrThrow(ids: number[]) {
    const permissions = await this.permissionRepo.find({
      where: { id: In(ids) },
    });
    const notFoundIds = ids.filter(
      (id) => !permissions.find((p) => p.id === id)
    );
    if (permissions.length !== ids.length) {
      throw new BusinessException({
        errorCode: ErrorCode.PERMISSION_NOT_FOUND,
        httpCode: HttpStatus.NOT_FOUND,
        message: 'Some permissions not found',
        additionalData: { notFoundIds },
      });
    }
    return permissions;
  }
}
