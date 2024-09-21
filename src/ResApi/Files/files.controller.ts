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
}
