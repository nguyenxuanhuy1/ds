import { BadRequestException, Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { Banner } from './entities/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../Files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Banner]),
    FilesModule.forRoot('./public/uploads/banners'),
    MulterModule,
  ],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
