import { PartialType } from '@nestjs/mapped-types';
import { CreateProductKeyDto } from './create-product-key.dto';

export class UpdateProductKeyDto extends PartialType(CreateProductKeyDto) {}
