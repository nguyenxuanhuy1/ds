import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
@ApiTags('Api-Files')
@Controller('files')
export class FilesController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/upload',
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname).toLowerCase();
          const allowedExtensions = ['.png', '.jpg', '.jpeg'];
          if (!allowedExtensions.includes(fileExtName)) {
            return cb(
              new BadRequestException(
                'Tải ảnh lên không đúng định dạng PNG, Hoặc jpeg, jpg',
              ),
              null,
            );
          }

          const timeString = `${Date.now().toString(36)}`;
          const newFileName = `${timeString}${fileExtName}`;

          cb(null, newFileName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    }),
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('Tên tệp bị thiếu hoặc không hợp lệ');
    }
    return file;
  }

  // get file
  @Get(':fileName')
  serveImage(@Param('fileName') fileName: string, @Res() res: Response) {
    const absolutePath = `E:\\BeDvine\\divine-shop\\public\\upload\\${fileName}`;
    if (fs.existsSync(absolutePath)) {
      return res.sendFile(absolutePath);
    } else {
      return res
        .status(404)
        .json({ message: 'KHông có ảnh này hoặc đang sai tên' });
    }
  }
}
