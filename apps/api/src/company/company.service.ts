import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Not, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { CompanyEntity } from './company.entity';
import type { CreateUserCompanyDto } from './dto/create-user-company.dto';
import type { UserEntity } from '../user/user.entity';
import type { UpdateUserCompanyDto } from './dto/update-user-company.dto';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/enums/error-code.enum';

@Injectable()
export class CompanyService extends TypeOrmCrudService<CompanyEntity> {
  constructor(
    @InjectRepository(CompanyEntity)
    override readonly repo: Repository<CompanyEntity>
  ) {
    super(repo);
  }

  async createUserCompany(dto: CreateUserCompanyDto, user: UserEntity) {
    const { name } = dto;

    const company = await this.repo.findOne({ where: { name } });
    if (company) {
      throw new BusinessException({
        errorCode: ErrorCode.COMPANY_NAME_ALREADY_EXIST,
        httpCode: HttpStatus.CONFLICT,
      });
    }

    return this.repo.save({ ...dto, user });
  }

  async updateUserCompany(
    id: number,
    dto: UpdateUserCompanyDto,
    user: UserEntity
  ) {
    const company = await this.repo.findOne({
      where: { user: { id: user.id }, id },
    });
    if (!company) {
      throw new BusinessException({
        errorCode: ErrorCode.USER_DOES_NOT_HAVE_COMPANY,
        httpCode: HttpStatus.NOT_FOUND,
      });
    }

    const nameExist = await this.repo.findOne({
      where: { name: dto.name, id: Not(id) },
    });
    if (nameExist) {
      throw new BusinessException({
        errorCode: ErrorCode.COMPANY_NAME_ALREADY_EXIST,
        httpCode: HttpStatus.CONFLICT,
      });
    }

    return this.repo.update(company.id, dto);
  }
}
