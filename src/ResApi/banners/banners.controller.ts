import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileUploadService } from '../Files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
const multerOptions = (fileUploadService: FileUploadService) => {
  return FileInterceptor(
    'file',
    fileUploadService.getMulterOptions('./public/upload'),
  );
};
@ApiTags('API-Banners')
@Controller('banners')
export class BannersController {
  constructor(
    private readonly bannersService: BannersService,
    private readonly fileUploadService: FileUploadService,
  ) {}
  @Get()
  async getMenuList(): Promise<{ list: CreateBannerDto[] }> {
    return this.bannersService.getBannerList();
  }
  @Post()
  @UseInterceptors(multerOptions(new FileUploadService())) // Sử dụng hàm bên ngoài
  async createBanner(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBannerDto: CreateBannerDto,
  ) {
    if (!file) {
      throw new BadRequestException('File không được tải lên');
    }
    const imagePath = this.fileUploadService.getFileUrl(file, '/public/upload');

    createBannerDto.image = imagePath;
    createBannerDto.href = imagePath;

    // Lưu thông tin banner vào cơ sở dữ liệu
    return this.bannersService.createBanner(createBannerDto);
  }
}
