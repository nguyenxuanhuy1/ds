import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SlideService } from './slide.service';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('API-Slide')
@Controller('slide')
export class SlideController {
  constructor(private readonly slideService: SlideService) {}

  @Get()
  async getMenuList(): Promise<{ list: CreateSlideDto[] }> {
    return this.slideService.getSlideList();
  }
}