import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './ResApi/user/user.module';
import { User } from './ResApi/user/entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from './ResApi/Files/files.module';
import { ProductsModule } from './ResApi/products/products.module';
import { Product } from './ResApi/products/entities/product.entity';
import { Category } from './ResApi/categories/entities/category.entity';
import { CategoriesModule } from './ResApi/categories/categories.module';
import { Order } from './ResApi/orders/entities/order.entity';
import { OrdersModule } from './ResApi/orders/orders.module';
import { OrderItem } from './ResApi/order-item/entities/order-item.entity';
import { OrderItemModule } from './ResApi/order-item/order-item.module';
import { ProductKey } from './ResApi/product-key/entities/product-key.entity';
import { ProductKeyModule } from './ResApi/product-key/product-key.module';
import { Cart } from './ResApi/cart/entities/cart.entity';
import { CartItem } from './ResApi/cart-item/entities/cart-item.entity';
import { Coupon } from './ResApi/coupon/entities/coupon.entity';
import { CartModule } from './ResApi/cart/cart.module';
import { CartItemModule } from './ResApi/cart-item/cart-item.module';
import { CouponModule } from './ResApi/coupon/coupon.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'Dvine',
      entities: [
        User,
        Product,
        Category,
        Order,
        OrderItem,
        ProductKey,
        Cart,
        CartItem,
        Coupon,
      ],
      synchronize: true,
    }),
    FilesModule,
    MulterModule.register({ dest: './public/upload' }),
    UserModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    OrderItemModule,
    ProductKeyModule,
    CartModule,
    CartItemModule,
    CouponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
