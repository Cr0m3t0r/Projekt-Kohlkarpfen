import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./user/model/User";
import {UserModule} from "./user/user.module";
import {Trader} from "./trader/model/Trader";
import {Admin} from "./admin/model/Admin";
import {Product} from "./product/model/Product";
import {AdminModule} from "./admin/admin.module";
import {TraderModule} from "./trader/trader.module";
import {ProductModule} from "./product/product.module";
import {TagModule} from "./tag/tag.module";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/todolist.sqlite',
      autoLoadEntities: true,
      entities: [User, Trader, Admin, Product],
      synchronize: true,
    }),
      UserModule, AdminModule, TraderModule, ProductModule, TagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
