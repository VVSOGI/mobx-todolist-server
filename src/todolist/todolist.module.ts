import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';

@Module({
  imports: [AuthModule],
  controllers: [TodolistController],
  providers: [TodolistService, AuthService, JwtService],
})
export class TodolistModule {}
