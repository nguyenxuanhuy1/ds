import { Injectable } from '@nestjs/common';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';
import { Slide } from './entities/slide.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SlideService {
    constructor(
        @InjectRepository(Slide)
        private Repository: Repository<Slide>,
      ) {}
    async getSlideList(): Promise<{ list: CreateSlideDto[] }> {
        const sileEntities = await this.Repository.find();
        const list: CreateSlideDto[] = sileEntities.map(slide => ({
        image:slide.image,
          href: slide.href,
        }));
    
        return { list };
      }
}
