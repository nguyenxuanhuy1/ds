import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateNewsDto } from './dto/create-news.dto';
@ApiTags('API-News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  async getMenuList(): Promise<{ list: CreateNewsDto[] }> {
    return this.newsService.getNewsList();
  }
  @Post()
  async createNews(@Body() createNewsDto: CreateNewsDto) {
    try {
      return await this.newsService.createNews(createNewsDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
