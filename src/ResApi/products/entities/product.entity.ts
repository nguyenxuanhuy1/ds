import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
// import { Review } from './review.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { ProductKey } from '../../product-key/entities/product-key.entity';
import { CartItem } from 'src/ResApi/cart-item/entities/cart-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Index()
  @Column()
  slugType: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  originalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => ProductKey, (productKey) => productKey.product)
  productKeys: ProductKey[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
