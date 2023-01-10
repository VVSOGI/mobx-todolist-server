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
import { GoalsService } from './goals.service';

@Controller('goals')
@UseGuards(AuthGuard('jwt'))
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Get()
  getAllGoals(@GetUser() user: User) {
    return this.goalsService.getAllGoals(user.id);
  }

  @Post()
  createGoal(@Body() createTodoDto: CreateTodoDto, @GetUser() user: User) {
    const { contents } = createTodoDto;
    return this.goalsService.createGoal(contents, user.id);
  }

  @Patch('check/:id')
  updateCheck(@Param('id') id: string) {
    return this.goalsService.updateCheck(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string, @GetUser() user: User) {
    return this.goalsService.deleteGoal(id, user.id);
  }
}
