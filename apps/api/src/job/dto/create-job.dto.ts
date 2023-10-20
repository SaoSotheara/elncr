import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { TransformBoolean } from '../../common/decorators/transform/transform-boolean.decorator';
import { TransformNumber } from '../../common/decorators/transform/transform-number.decorator';

export class CreateJobDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  minSalary: number;

  @ApiProperty()
  @IsNotEmpty()
  maxSalary: number;

  @ApiPropertyOptional()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  howToApply?: string;

  @ApiPropertyOptional({ type: Boolean, default: false })
  @TransformBoolean()
  @IsBoolean()
  @IsOptional()
  isRemote = false;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  applicationTarget = 'email';

  @ApiPropertyOptional()
  @IsNotEmpty()
  @TransformNumber()
  @IsOptional()
  levelId: number;

  @ApiProperty()
  @TransformNumber()
  @IsOptional()
  jobTypeId = 2;

  @ApiPropertyOptional()
  @IsOptional()
  @TransformNumber()
  paymentTypeId: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @TransformNumber()
  currencyId: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @TransformNumber()
  locationId: number;

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsOptional()
  tagIds: number[] = [4];
}
