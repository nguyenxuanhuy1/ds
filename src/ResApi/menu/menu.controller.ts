import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
@ApiTags('API-Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get()
  async getMenuList(): Promise<{ list: CreateMenuDto[] }> {
    return this.menuService.getMenuList();
  }
  
}
