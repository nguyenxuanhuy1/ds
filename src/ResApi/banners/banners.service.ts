import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'src/helper/pagination';
import { removeVietnameseTones } from 'src/utils/removeVN';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private Repository: Repository<Banner>,
  ) {}
  //
  async createBanner(createBannerDto: CreateBannerDto) {
    createBannerDto.href = `${process.env.BASEURL}banners/${removeVietnameseTones(createBannerDto.slug)}`;
    return this.saveBannerToDatabase(createBannerDto);
  }
  private async saveBannerToDatabase(createBannerDto: CreateBannerDto) {
    return this.Repository.save(createBannerDto);
  }

  async getBannerList(
    slug: string | null,
    page: number,
    pageSize: number,
  ): Promise<{ list: CreateBannerDto[]; totalItems: number }> {
    const queryBuilder = this.Repository.createQueryBuilder('banner');
    if (slug) {
      queryBuilder.where('banner.slug LIKE :slug', { slug: `%${slug}%` });
    }
    const totalItems = await queryBuilder.getCount();

    const paginationResult = await paginate(
      this.Repository,
      queryBuilder,
      page,
      pageSize,
    );

    const list: CreateBannerDto[] = paginationResult.data.map((banner) => {
      const bannerDto: CreateBannerDto = {
        id: banner.id,
        image: banner.image,
        href: banner.href,
        slug: banner.slug,
      };
      if (banner.openInNewTab === true) {
        bannerDto.openInNewTab = banner.openInNewTab;
      }
      return bannerDto;
    });

    return { list, totalItems };
  }

  async deleteBanner(id: number): Promise<void> {
    const banner = await this.Repository.findOne({ where: { id } });

    if (!banner) {
      throw new NotFoundException(`Not found banner with ID ${id}`);
    }
    await this.Repository.remove(banner);
  }
}
