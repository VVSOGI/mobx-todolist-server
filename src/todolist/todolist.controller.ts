import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/auth.type';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodolistService } from './todolist.service';

@Controller('todolist')
@UseGuards(AuthGuard('jwt'))
export class TodolistController {
  constructor(private todolistService: TodolistService) {}

  @Get(':goalId')
  async getAllUserTodolist(@Param('goalId') goalId: string) {
    return await this.todolistService.getAllTodolist(goalId);
  }

  @Post()
  async createTodolist(@Body() createTodoDto: CreateTodoDto) {
    return await this.todolistService.createTodolist(createTodoDto);
  }

  @Patch(':id')
  async updateCheckTodo(@Param('id') id: string) {
    return await this.todolistService.updateCheckTodolist(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todolistService.deleteTodo(id);
  }
}
