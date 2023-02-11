import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistController } from './todolist/todolist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListEntry } from './todolist/model/TodoListEntry';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/todolist.sqlite',
      entities: [TodoListEntry],
      synchronize: true,
    }),
  ],
  controllers: [AppController, TodolistController],
  providers: [AppService],
})
export class AppModule {}
