import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { Banner } from './entities/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../Files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Banner]), FilesModule],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
