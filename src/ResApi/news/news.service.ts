import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { removeVietnameseTones } from 'src/utils/removeVN';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private Repository: Repository<News>,
  ) {}

  // create service
  async createNews(createNewsDto: CreateNewsDto): Promise<CreateNewsDto> {
    createNewsDto.href = `${process.env.BASEURL}News/${removeVietnameseTones(createNewsDto.text)}`;
    return this.saveNewsToDatabase(createNewsDto);
  }
  private async saveNewsToDatabase(createNewsDto: CreateNewsDto) {
    return this.Repository.save(createNewsDto);
  }

  async getNewsList(): Promise<{ list: CreateNewsDto[] }> {
    const newsEntities = await this.Repository.find();

    const list: CreateNewsDto[] = newsEntities.map((news) => ({
      icon: news.icon,
      text: news.text,
      href: news.href,
    }));

    return { list };
  }
}
