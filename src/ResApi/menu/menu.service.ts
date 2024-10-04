import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadService } from '../Files/files.service';
import { removeVietnameseTones } from 'src/utils/removeVN';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private Repository: Repository<Menu>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  // create service
  async createMenu(file: Express.Multer.File, createMenuDto: CreateMenuDto) {
    const imagePath = this.fileUploadService.getFileUrl(
      file,
      `${process.env.BASEURL}public/uploads/Menus`,
    );
    createMenuDto.icon = imagePath;

    createMenuDto.href = `${process.env.BASEURL}menus/${removeVietnameseTones(createMenuDto.text)}`;
    return this.saveMenuToDatabase(createMenuDto);
  }

  private async saveMenuToDatabase(createMenuDto: CreateMenuDto) {
    return this.Repository.save(createMenuDto);
  }

  //
  async getMenuList(): Promise<{ list: CreateMenuDto[] }> {
    const menuEntities = await this.Repository.find();
    const list: CreateMenuDto[] = menuEntities.map((menu) => ({
      icon: menu.icon,
      text: menu.text,
      href: menu.href,
    }));

    return { list };
  }
}
