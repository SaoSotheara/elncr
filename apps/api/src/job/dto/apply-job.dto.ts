import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class ApplyJobDto {
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  cvFileUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  coverLetterFileUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  message?: string;
}
