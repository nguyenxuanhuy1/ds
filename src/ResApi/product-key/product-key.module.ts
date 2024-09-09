import { Module } from '@nestjs/common';
import { ProductKeyService } from './product-key.service';
import { ProductKeyController } from './product-key.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductKey } from './entities/product-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductKey])],
  controllers: [ProductKeyController],
  providers: [ProductKeyService],
})
export class ProductKeyModule {}
