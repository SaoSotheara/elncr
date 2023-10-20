import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsString() // todo: isUrl
  @IsOptional()
  profileImageUrl?: string;

  @ApiProperty()
  @IsString() // todo: isPhoneNumber
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  isVerified?: boolean;

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsNumber({}, { each: true })
  @IsOptional()
  roleIds: number[];

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  companyId?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsString()
  birthDate?: string;
}
