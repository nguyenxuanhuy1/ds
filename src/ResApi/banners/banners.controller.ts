import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('API-Banners')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}
  @Get()
  async getMenuList(): Promise<{ list: CreateBannerDto[] }> {
    return this.bannersService.getBannerList();
  }
}
