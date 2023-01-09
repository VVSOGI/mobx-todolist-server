import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodolistService } from './todolist.service';

@Controller('todolist')
export class TodolistController {
  constructor(private todolistService: TodolistService) {}

  @Get()
  getAllTodos() {
    return this.todolistService.getAllTodos();
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    const { contents } = createTodoDto;
    return `${contents} createTodo`;
  }

  @Patch('check/:id')
  updateCheck(@Param('id') id: string) {
    return `${id} updateCheck`;
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return `${id} deleteTodo`;
  }
}
