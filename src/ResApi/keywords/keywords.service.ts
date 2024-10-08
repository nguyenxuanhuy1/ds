import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';
import { Repository } from 'typeorm';
import { CreateKeywordDto } from './dto/create-keyword.dto';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectRepository(Keyword)
    private Repository: Repository<Keyword>,
  ) {}
  async getKeywordList(): Promise<{ list: CreateKeywordDto[] }> {
    const keywordEntities = await this.Repository.find();

    const list: CreateKeywordDto[] = keywordEntities.map((keyword) => ({
      text: keyword.text,
      href: keyword.href,
    }));

    return { list };
  }

  async createKeywordList(
    createKeywordDto: CreateKeywordDto,
  ): Promise<Keyword> {
    const { text } = createKeywordDto;
    const href = `/search?tag=${text}`;
    const newKeyword = this.Repository.create({ text, href });
    return await this.Repository.save(newKeyword);
  }
}
