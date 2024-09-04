import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './ResApi/user/user.module';
import { User } from './ResApi/user/entities/user.entity';
import { MenuModule } from './ResApi/menu/menu.module';
import { Menu } from './ResApi/menu/entities/menu.entity';
import { Slide } from './ResApi/slide/entities/slide.entity';
import { SlideModule } from './ResApi/slide/slide.module';
import { Keyword } from './ResApi/keywords/entities/keyword.entity';
import { KeywordsModule } from './ResApi/keywords/keywords.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'Dvine',
      entities: [User,Menu,Slide,Keyword],
      // logging: ['query', 'warn', 'error'],
      synchronize: true,
    }),
    UserModule,
    MenuModule,
    SlideModule,
    KeywordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
