import { BadRequestException, Module, DynamicModule } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FileUploadService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
@Module({
  controllers: [FilesController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FilesModule {
  static forRoot(destinationPath: string): DynamicModule {
    return {
      module: FilesModule,
      imports: [
        MulterModule.register({
          storage: diskStorage({
            destination: (req, file, callback) => {
              fs.mkdir(
                path.resolve(destinationPath),
                { recursive: true },
                (err) => {
                  if (err) {
                    console.error('Không thể tạo thư mục:', err);
                    return callback(err, destinationPath);
                  }
                  callback(null, destinationPath);
                },
              );
            },
            filename: (req, file, callback) => {
              const sanitizedFileName = file.originalname.replace(/\s+/g, '-');
              callback(null, sanitizedFileName);
            },
          }),
          fileFilter: (req, file, callback) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
              callback(null, true);
            } else {
              callback(
                new BadRequestException(
                  'Chỉ chấp nhận định dạng (jpg, jpeg, png, gif)',
                ),
                false,
              );
            }
          },
        }),
      ],
      exports: [MulterModule, FileUploadService],
    };
  }
}
