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

    // Sử dụng FileUploadService để lấy đường dẫn file đã upload
    const imagePath = this.fileUploadService.getFileUrl(file, '/public/upload');

    // Gán đường dẫn file vừa upload cho cả thuộc tính image và href
    createBannerDto.image = imagePath;
    createBannerDto.href = imagePath; // Tự động lấy đường dẫn của ảnh để làm giá trị href

    // Lưu thông tin banner vào cơ sở dữ liệu
    return this.bannersService.createBanner(createBannerDto);
  }
}
