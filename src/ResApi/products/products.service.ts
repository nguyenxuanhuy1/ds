import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { FileUploadService } from '../Files/files.service';
import { CreateProductDto } from './dto/create-product.dto';
import { removeVietnameseTones } from 'src/utils/removeVN';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly Repository: Repository<Product>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async createProduct(
    file: Express.Multer.File,
    createProductDto: CreateProductDto,
  ) {
    const imagePath = this.fileUploadService.getFileUrl(
      file,
      `${process.env.BASEURL}public/uploads/products`,
    );
    createProductDto.image = imagePath;
    // createProductDto.href = `${process.env.BASEURL}Products/${removeVietnameseTones(createProductDto.slug)}`;
    return this.saveProductToDatabase(createProductDto);
  }
  private async saveProductToDatabase(createProductDto: CreateProductDto) {
    return this.Repository.save(createProductDto);
  }
}
