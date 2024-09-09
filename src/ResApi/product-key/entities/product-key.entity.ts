import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class ProductKey {
  @PrimaryGeneratedColumn()
  keyId: number;

  @ManyToOne(() => Product, (product) => product.productKeys)
  product: Product;

  //   @ManyToOne(() => Order, (order) => order.productKeys, { nullable: true })
  //   order: Order;

  @Column()
  key: string;

  @Column({
    type: 'enum',
    enum: ['available', 'used', 'reserved'],
    default: 'available',
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
