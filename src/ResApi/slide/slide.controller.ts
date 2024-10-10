import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { SlideService } from './slide.service';
import { CreateSlideDto } from './dto/create-slide.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('API-Slide')
@Controller('slide')
export class SlideController {
  constructor(private readonly slideService: SlideService) {}

  @Get()
  async getMenuList(): Promise<{ list: CreateSlideDto[] }> {
    return this.slideService.getSlideList();
  }
  // Tạo mới slide
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createBanner(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSlideDto: CreateSlideDto,
  ) {
    if (!file) {
      throw new BadRequestException('File không được tải lên');
    }
    return this.slideService.createSlide(file, createSlideDto);
  }
}
