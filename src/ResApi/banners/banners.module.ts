import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { Banner } from './entities/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../Files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Banner]),
    FilesModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './public/uploads', // Thư mục lưu file
        filename: (req, file, callback) => {
          // Đổi tên file, thêm định danh ngẫu nhiên
          const randomName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Giữ lại phần mở rộng của file
          console.log(randomName);

          callback(null, `${randomName}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Kiểm tra loại file
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          callback(null, true); // Chấp nhận file ảnh
        } else {
          callback(new Error('Only image files are allowed!'), false);
        }
      },
    }),
  ],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
