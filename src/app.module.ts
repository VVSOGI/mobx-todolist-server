import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistController } from './todolist/todolist.controller';
import { TodolistService } from './todolist/todolist.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [AppController, TodolistController, UsersController],
  providers: [AppService, TodolistService, UsersService],
})
export class AppModule {}
