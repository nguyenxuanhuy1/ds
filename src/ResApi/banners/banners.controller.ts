import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  HttpCode,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto, SearchBannerDto } from './dto/create-banner.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('API-Banners')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post('search')
  @HttpCode(200)
  async searchBanner(
    @Body() searchBannerDto: SearchBannerDto,
  ): Promise<{ list: CreateBannerDto[] }> {
    const { slug, page, pageSize } = searchBannerDto;
    return this.bannersService.getBannerList(slug, page, pageSize);
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

  @Post('delete/:id')
  @HttpCode(200)
  async deleteBanner(
    @Param('id') id: number,
  ): Promise<{ message: string; success: boolean }> {
    await this.bannersService.deleteBanner(id);
    return {
      message: 'Xoá thành công',
      success: true,
    };
  }
}
