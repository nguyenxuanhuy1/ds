import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSlideDto } from './dto/create-slide.dto';
import { Slide } from './entities/slide.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileUploadService } from '../Files/files.service';
import { removeVietnameseTones } from 'src/utils/removeVN';

@Injectable()
export class SlideService {
  constructor(
    @InjectRepository(Slide)
    private Repository: Repository<Slide>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  // create service
  async createSlide(file: Express.Multer.File, createSlideDto: CreateSlideDto) {
    const imagePath = this.fileUploadService.getFileUrl(
      file,
      `${process.env.BASEURL}public/uploads/Slides`,
    );
    createSlideDto.image = imagePath;

    createSlideDto.href = `${process.env.BASEURL}slides/${removeVietnameseTones(createSlideDto.slug)}`;
    return this.saveSlideToDatabase(createSlideDto);
  }

  private async saveSlideToDatabase(createSlideDto: CreateSlideDto) {
    return this.Repository.save(createSlideDto);
  }
  // get list slide
  async getSlideList(): Promise<{ list: CreateSlideDto[] }> {
    const sileEntities = await this.Repository.find();
    const list: CreateSlideDto[] = sileEntities.map((slide) => ({
      image: slide.image,
      href: slide.href,
    }));

    return { list };
  }
}
