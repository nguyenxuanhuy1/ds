import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    // @InjectRepository(Product)
    // private productRepository: Repository<Product>,
  ) {}

  // Phương thức để thống kê số lượng sản phẩm đã bán
  async getSalesStatistics(): Promise<any> {
    const salesData = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .select('orderItem.product.id', 'productId')
      .addSelect('SUM(orderItem.quantity)', 'totalQuantity')
      .groupBy('orderItem.product.id')
      .getRawMany();

    const results = salesData.map((data) => ({
      productId: data.productId,
      totalQuantity: parseInt(data.totalQuantity, 10), // Chuyển đổi thành số nguyên
    }));

    return results;
  }
}
