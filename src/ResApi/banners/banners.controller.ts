import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('API-Banners')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}
  @Get()
  async getMenuList(): Promise<{ list: CreateBannerDto[] }> {
    return this.bannersService.getBannerList();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createBanner(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBannerDto: CreateBannerDto,
  ) {
    if (!file) {
      throw new BadRequestException('File không được tải lên');
    }
    return this.bannersService.createBanner(file, createBannerDto);
  }
}
