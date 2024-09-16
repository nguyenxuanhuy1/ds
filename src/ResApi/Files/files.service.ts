import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class FileUploadService {
  getMulterOptions(destination: string): MulterOptions {
    return {
      storage: diskStorage({
        destination,
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname).toLowerCase();
          const allowedExtensions = ['.png', '.jpg', '.jpeg'];
          if (!allowedExtensions.includes(fileExtName)) {
            return cb(
              new BadRequestException(
                `Định dạng file không hợp lệ. Chỉ chấp nhận: ${allowedExtensions.join(', ')}`,
              ),
              null,
            );
          }
          // const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          // const fileName = `${uniqueSuffix}${fileExtName}`;
          // cb(null, fileName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    };
  }

  getFileUrl(file: Express.Multer.File, destination: string): string {
    return `${destination}/${file.originalname}`;
  }
}
