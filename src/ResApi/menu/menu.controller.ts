import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('API-Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get()
  async getMenuList(): Promise<{ list: CreateMenuDto[] }> {
    return this.menuService.getMenuList();
  }
  // tạo mới controller Menu
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createBanner(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    if (!file) {
      throw new BadRequestException('File không được tải lên');
    }
    return this.menuService.createMenu(file, createMenuDto);
  }
}
