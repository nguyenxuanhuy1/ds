import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { existsSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' là tên của input file
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file); // Xem thông tin file được upload
    return { filename: file.filename };
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'uploads',
      filename,
    ); // Đường dẫn đến thư mục lưu file

    if (existsSync(filePath)) {
      return res.download(filePath); // Tải file nếu tồn tại
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'File not found' });
    }
  }
}
