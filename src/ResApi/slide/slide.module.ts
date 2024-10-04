import { Module } from '@nestjs/common';
import { SlideService } from './slide.service';
import { SlideController } from './slide.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slide } from './entities/slide.entity';
import { FilesModule } from '../Files/files.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Slide]),
    FilesModule.forRoot('./public/uploads/slides'),
    MulterModule,
  ],
  controllers: [SlideController],
  providers: [SlideService],
})
export class SlideModule {}
