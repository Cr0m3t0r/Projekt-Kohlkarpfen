import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/model/Admin';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/todolist.sqlite',
      entities: [Admin],
      synchronize: true,
    }),
  ],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
