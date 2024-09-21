import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class FileUploadService {
  getFileUrl(file: Express.Multer.File, destination: string): string {
    const sanitizedFileName = file.originalname.replace(/\s+/g, '-');
    return `${destination}/${sanitizedFileName}`;
  }
}
