import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { FilesModule } from '../Files/files.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    FilesModule.forRoot('./public/uploads/menus'),
    MulterModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
