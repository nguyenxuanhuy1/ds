import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class FileUploadService {
  // Cấu hình Multer để lưu trữ file và kiểm tra định dạng file
  getMulterOptions(destination: string): MulterOptions {
    return {
      storage: diskStorage({
        destination, // Thư mục đích để lưu file
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname).toLowerCase();
          const allowedExtensions = ['.png', '.jpg', '.jpeg'];

          // Kiểm tra định dạng file
          if (!allowedExtensions.includes(fileExtName)) {
            return cb(
              new BadRequestException(
                `Định dạng file không hợp lệ. Chỉ chấp nhận: ${allowedExtensions.join(', ')}`,
              ),
              null,
            );
          }

          // Tạo tên file duy nhất
          const fileName = `${fileExtName}`;
          cb(null, fileName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn file tối đa 5MB
    };
  }

  // Hàm để trả về đường dẫn của file sau khi upload
  getFileUrl(file: Express.Multer.File, destination: string): string {
    return `${destination}/${file.filename}`;
  }
}
