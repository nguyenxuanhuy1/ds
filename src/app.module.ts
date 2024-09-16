import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { Slide } from './ResApi/slide/entities/slide.entity';
import { Banner } from './ResApi/banners/entities/banner.entity';
import { News } from './ResApi/news/entities/news.entity';
import { SlideModule } from './ResApi/slide/slide.module';
import { BannersModule } from './ResApi/banners/banners.module';
import { NewsModule } from './ResApi/news/news.module';
import { Menu } from './ResApi/menu/entities/menu.entity';
import { MenuModule } from './ResApi/menu/menu.module';
import { Keyword } from './ResApi/keywords/entities/keyword.entity';
import { KeywordsModule } from './ResApi/keywords/keywords.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
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
          Slide,
          Banner,
          News,
          Menu,
          Keyword,
        ],
        synchronize: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    FilesModule,
    UserModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    OrderItemModule,
    ProductKeyModule,
    CartModule,
    CartItemModule,
    CouponModule,
    SlideModule,
    BannersModule,
    NewsModule,
    MenuModule,
    KeywordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
