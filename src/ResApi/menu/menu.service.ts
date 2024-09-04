import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private Repository: Repository<Menu>,
  ) {}
  async getMenuList(): Promise<{ list: CreateMenuDto[] }> {
    const menuEntities = await this.Repository.find();

    const list: CreateMenuDto[] = menuEntities.map(menu => ({
      icon: menu.icon,
      text: menu.text,
      href: menu.href,
    }));

    return { list };
  }
  
}
