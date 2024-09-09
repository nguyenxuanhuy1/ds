import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductKeyService } from './product-key.service';
import { CreateProductKeyDto } from './dto/create-product-key.dto';
import { UpdateProductKeyDto } from './dto/update-product-key.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Api-Product key')
@Controller('product-key')
export class ProductKeyController {
  constructor(private readonly productKeyService: ProductKeyService) {}

  @Post()
  create(@Body() createProductKeyDto: CreateProductKeyDto) {
    return this.productKeyService.create(createProductKeyDto);
  }

  @Get()
  findAll() {
    return this.productKeyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productKeyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductKeyDto: UpdateProductKeyDto,
  ) {
    return this.productKeyService.update(+id, updateProductKeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productKeyService.remove(+id);
  }
}
