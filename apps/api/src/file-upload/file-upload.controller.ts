import {
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';

import { FILE_KEY } from '../common/constants/common.constants';

import { FileUploadService } from './file-upload.service';
import { ApiFileBody } from '../common/decorators/api-file-body.decorator';
import { ApiResource } from '../common/decorators/api-resource.decorator';

@ApiResource('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadsService: FileUploadService) {}

  @ApiOperation({
    summary: 'Upload file',
  })
  @ApiFileBody({
    key: FILE_KEY,
    required: true,
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            // todo
            // max size 30mb
            maxSize: 30 * 1024 * 1024,
          }),
        ],
      })
    )
    file: Express.Multer.File
  ): Promise<string> {
    return this.fileUploadsService.upload(file);
  }
}
