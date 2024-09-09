import { Injectable } from '@nestjs/common';
import { CreateProductKeyDto } from './dto/create-product-key.dto';
import { UpdateProductKeyDto } from './dto/update-product-key.dto';

@Injectable()
export class ProductKeyService {
  create(createProductKeyDto: CreateProductKeyDto) {
    return 'This action adds a new productKey';
  }

  findAll() {
    return `This action returns all productKey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productKey`;
  }

  update(id: number, updateProductKeyDto: UpdateProductKeyDto) {
    return `This action updates a #${id} productKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} productKey`;
  }
}
