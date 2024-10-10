import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('Api-products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Get()
  // async getMenuList(): Promise<{ list: CreateProductDto[] }> {
  //   return this.productsService.getProductList();
  // }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createBanner(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    if (!file) {
      throw new BadRequestException('File không được tải lên');
    }
    return this.productsService.createProduct(file, createProductDto);
  }
}
