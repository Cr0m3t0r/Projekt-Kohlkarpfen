import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/model/Admin';
import {Product} from "./product/model/Product";
import {Trader} from "./trader/model/Trader";
import {User} from "./user/model/User";
import {ProductController} from "./product/product.controller";
import {TraderController} from "./trader/trader.controller";
import {UserController} from "./user/user.controller";
import {UserService} from "./user/user.service";
import {ProductService} from "./product/product.service";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/todolist.sqlite',
      entities: [Admin, Product, Trader, User],
      synchronize: true,
    })
  ],
  controllers: [AppController, AdminController, UserController, ProductController, TraderController],
  providers: [AppService, UserService, ProductService],
})
export class AppModule {}
