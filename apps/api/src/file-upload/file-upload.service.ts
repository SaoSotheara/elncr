import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { FirebaseStorageService } from '@open-lens/nestjs-firebase-admin';
import { getFileExtension } from '../common/utils/common.helpers';

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);
  constructor(private readonly storageService: FirebaseStorageService) {}

  async upload(file: Express.Multer.File): Promise<string> {
    const fileName = `${randomUUID()}.${getFileExtension(file.originalname)}`;
    const contentType = file.mimetype;

    const bucket = this.storageService.bucket();
    const bucketFile = bucket.file(fileName);

    await bucketFile.save(file.buffer, {
      contentType,
      public: true,
    });

    return bucketFile.publicUrl();
  }
}
