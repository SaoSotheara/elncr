import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Expose, Transform } from 'class-transformer';

export class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'URL' })
  readonly url: string;

  @IsOptional()
  @Transform(({ value }) => {
    // transform boolean but ignore if value is not boolean string
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return value;
  })
  @Expose({ name: 'LOGGING' })
  readonly logging: LoggerOptions = false;
}
