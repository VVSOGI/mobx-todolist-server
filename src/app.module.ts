import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GoalsModule } from './goals/goals.module';
import { TodolistModule } from './todolist/todolist.module';

@Module({
  imports: [GoalsModule, TodolistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
