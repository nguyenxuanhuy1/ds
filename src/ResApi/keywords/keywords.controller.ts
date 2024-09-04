import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateKeywordDto } from './dto/create-keyword.dto';
@ApiTags('API-Keyword')
@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Get()
  async getMenuList(): Promise<{ list: CreateKeywordDto[] }> {
    return this.keywordsService.getMenuList();
  }
}
