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
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { FileUploadService } from './files.service';
import { extname, join } from 'path';
import { diskStorage } from 'multer';

@ApiTags('Api-Files')
@Controller('files')
export class FilesController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  // Upload file với cấu hình từ FileUploadService
  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './public/upload',
  //       filename: (req, file, cb) => {
  //         const fileExtName = extname(file.originalname).toLowerCase();
  //         const allowedExtensions = ['.png', '.jpg', '.jpeg'];
  //         if (!allowedExtensions.includes(fileExtName)) {
  //           return cb(
  //             new BadRequestException(
  //               'Tải ảnh lên không đúng định dạng PNG, Hoặc jpeg, jpg',
  //             ),
  //             null,
  //           );
  //         }

  //         const timeString = `${Date.now().toString(36)}`;
  //         const newFileName = `${timeString}${fileExtName}`;

  //         cb(null, newFileName);
  //       },
  //     }),
  //     limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  //   }),
  // )
  // async uploadFile(@UploadedFile() file) {
  //   if (!file) {
  //     throw new BadRequestException('Tên tệp bị thiếu hoặc không hợp lệ');
  //   }
  //   return {
  //     message: 'Tệp đã tải lên thành công',
  //     filePath: `/public/upload/${file.filename}`,
  //   };
  // }

  // // Lấy file bằng tên file
  // @Get(':fileName')
  // serveImage(@Param('fileName') fileName: string, @Res() res: Response) {
  //   const absolutePath = join(__dirname, '..', 'public', 'upload', fileName);
  //   if (fs.existsSync(absolutePath)) {
  //     return res.sendFile(absolutePath);
  //   } else {
  //     return res.status(404).json({ message: 'KHông có ảnh này hoặc sai tên' });
  //   }
  // }
}
