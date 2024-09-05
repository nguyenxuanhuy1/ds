import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private Repository: Repository<Banner>,
  ) {}
  async getBannerList(): Promise<{ list: CreateBannerDto[] }> {
    const bannerEntities = await this.Repository.find();
    const list: CreateBannerDto[] = bannerEntities.map(banner => {
      const bannerDto: CreateBannerDto = {
        image: banner.image,
        href: banner.href,
      };
      if (banner.openInNewTab === true) {
        bannerDto.openInNewTab = banner.openInNewTab;
      }
      return bannerDto;
    });
  
    return { list };
  }
}
