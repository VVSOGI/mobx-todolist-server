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
import { CreateGoalDto } from './dto/create-goal.dto';
import { GoalsService } from './goals.service';

@Controller('goals')
@UseGuards(AuthGuard('jwt'))
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Get()
  async getAllGoals(@GetUser() user: User) {
    return await this.goalsService.getAllGoals(user.id);
  }

  @Post()
  createGoal(@Body() createGoalDto: CreateGoalDto, @GetUser() user: User) {
    const { contents } = createGoalDto;
    return this.goalsService.createGoal(contents, user.id);
  }

  @Patch(':id')
  updateCheck(@Param('id') id: string) {
    return this.goalsService.updateCheck(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string, @GetUser() user: User) {
    return this.goalsService.deleteGoal(id, user.id);
  }
}
