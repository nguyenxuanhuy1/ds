import { BadRequestException, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(
            __dirname,
            '..',
            '..',
            '..',
            'public',
            'uploads',
          );
          cb(null, uploadPath); // Đường dẫn tới thư mục lưu trữ file
        },
        filename: (req, file, cb) => {
          // Sử dụng uuid để tạo tên file ngẫu nhiên và giữ nguyên phần mở rộng gốc
          const fileExt = file.originalname.split('.').pop();
          const fileName = `${uuidv4()}.${fileExt}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Chỉ chấp nhận định dạng (jpg, jpeg, png, svg)',
            ),
            false,
          );
        }
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
