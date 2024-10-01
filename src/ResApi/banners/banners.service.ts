import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from '../Files/files.service';
import { removeVietnameseTones } from 'src/utils/removeVN';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private Repository: Repository<Banner>,
    private readonly fileUploadService: FileUploadService,
  ) {}
  //
  async createBanner(
    file: Express.Multer.File,
    createBannerDto: CreateBannerDto,
  ) {
    const imagePath = this.fileUploadService.getFileUrl(
      file,
      `${process.env.BASEURL}public/uploads/banners`,
    );
    createBannerDto.image = imagePath;

    if (!createBannerDto.slug) {
      throw new BadRequestException('Slug không được để trống');
    }
    createBannerDto.href = `${process.env.BASEURL}banners/${removeVietnameseTones(createBannerDto.slug)}`;
    return this.saveBannerToDatabase(createBannerDto);
  }

  private async saveBannerToDatabase(createBannerDto: CreateBannerDto) {
    return this.Repository.save(createBannerDto);
  }

  //
  async getBannerList(): Promise<{ list: CreateBannerDto[] }> {
    const bannerEntities = await this.Repository.find();
    const list: CreateBannerDto[] = bannerEntities.map((banner) => {
      const bannerDto: CreateBannerDto = {
        slug: banner.slug,
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
