import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';
import type { CrudRequest } from '@open-lens/nestjs-crud';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { UpdateMeDto } from './dto/update-me.dto';
import { UserEntity } from './user.entity';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/enums/error-code.enum';
import type { PermissionMetadataValue } from '../auth/decorators/required-permission.decorator';
import { getPermissionActionResource } from '../common/utils/permission.utils';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { RoleEntity } from '../role/role.entity';
import { PermissionEntity } from '../permission/permission.entity';
import type { CreateUserDto } from './dto/create-user.dto';
import { FirebaseAuthenticationService } from '@open-lens/nestjs-firebase-admin';
import type { SignUpSessionPayload } from '../auth/firebase-jwt-strategy.service';
import { CompanyEntity } from '../company/company.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    override readonly repo: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepo: Repository<CompanyEntity>,
    private readonly firebaseAuthService: FirebaseAuthenticationService
  ) {
    super(repo);
  }

  async create(req: CrudRequest, dto: CreateUserDto, user: UserEntity) {
    const exist = await this.repo.exist({ where: { email: dto.email } });
    if (exist) {
      throw new BusinessException({
        errorCode: ErrorCode.USER_ALREADY_EXISTS,
        httpCode: HttpStatus.CONFLICT,
      });
    }
    const roles = await this.findRolesByIdsOrThrow(dto.roleIds);
    return super.createOne(req, { ...dto, createdBy: user, roles });
  }

  async update(
    req: CrudRequest,
    dto: UpdateUserDto | UpdateMeDto,
    user: UserEntity
  ) {
    // check if name is duplicated but not with itself
    if (dto.email) {
      const existing = await this.repo
        .createQueryBuilder('user')
        .where('user.email = :email', { email: dto.email })
        .andWhere('user.id != :id', { id: req.parsed.paramsFilter[0].value })
        .getExists();
      if (existing) {
        throw new BusinessException({
          errorCode: ErrorCode.USER_ALREADY_EXISTS,
          httpCode: HttpStatus.CONFLICT,
        });
      }
    }

    if ('roleIds' in dto) {
      const roles = await this.findRolesByIdsOrThrow(dto.roleIds);
      return super.updateOne(req, {
        ...dto,
        updatedBy: user,
        roles,
      });
    }

    if ('companyId' in dto) {
      const company = await this.companyRepo.findOne(dto.companyId);
      if (!company) {
        throw new BusinessException({
          errorCode: ErrorCode.COMPANY_NOT_FOUND,
          httpCode: HttpStatus.NOT_FOUND,
        });
      }
      return super.updateOne(req, { ...dto, updatedBy: user, company });
    }
    return super.updateOne(req, { ...dto, updatedBy: user });
  }

  private async findRolesByIdsOrThrow(ids: number[]) {
    const roles = await this.roleRepo.find({
      where: { id: In(ids) },
    });
    const notFoundIds = ids.filter(
      (id) => !roles.find((role) => role.id === id)
    );
    if (roles.length !== ids.length) {
      throw new BusinessException({
        errorCode: ErrorCode.ROLE_NOT_FOUND,
        httpCode: HttpStatus.NOT_FOUND,
        message: 'Some roles are not found.',
        additionalData: { notFoundIds },
      });
    }
    return roles;
  }

  async hasPermission(
    user: UserEntity,
    permissionAction: PermissionMetadataValue
  ) {
    const { action, resource } = permissionAction;
    const actionResource = getPermissionActionResource(action, resource);
    return await this.permissionRepo
      .createQueryBuilder('permission')
      .innerJoin('permission.roles', 'role')
      .innerJoin('role.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      // check if actionResource starts with manage: and user has manage:* permission
      .andWhere(
        `permission.actionResource = :actionResource OR permission.actionResource = :manageActionResource`,
        {
          actionResource,
          manageActionResource: `manage:${resource}`,
        }
      )
      .getExists();
  }

  override async createOne(req: CrudRequest, dto: UserEntity) {
    const exist = await this.repo.exist({ where: { email: dto.email } });
    if (exist) {
      throw new BusinessException({
        errorCode: ErrorCode.USER_ALREADY_EXISTS,
        httpCode: HttpStatus.NOT_FOUND,
      });
    }
    return super.createOne(req, dto);
  }

  async completeSignUp({ decodedToken }: SignUpSessionPayload) {
    const exist = await this.repo.exist({ where: { id: decodedToken.uid } });
    if (exist) {
      throw new BusinessException({
        errorCode: ErrorCode.USER_ALREADY_EXISTS,
        httpCode: HttpStatus.CONFLICT,
      });
    }

    const defaultSignUpRole = await this.roleRepo.findOne({
      where: { isDefaultUserRegistration: true },
    });
    if (!defaultSignUpRole) {
      this.logger.error('Default Sign Up Role Does Not Exist');
      throw new BusinessException({
        errorCode: ErrorCode.UNKNOWN_ERROR,
        httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    return this.repo.save(
      this.repo.create({
        id: decodedToken.uid,
        email: decodedToken.email,
        phoneNumber: decodedToken.phone_number,
        roles: [defaultSignUpRole],
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
        profileImageUrl: decodedToken.picture,
        isVerified: decodedToken.email_verified,
      })
    );
  }
}
