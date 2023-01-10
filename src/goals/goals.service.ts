import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Goals } from './goals.type';

@Injectable()
export class GoalsService {
  constructor(private readonly authService: AuthService) {}

  async getAllGoals(userId: number) {
    return await this.authService.query(`
    SELECT goals.id, goals.goal_title, goals.goal_date, goals.goal_ispoint, goals.user_id  FROM users
    INNER JOIN goals ON users.id = goals.user_id 
    WHERE user_id = ${userId}
	`);
  }

  async createGoal(title: string, userId: number) {
    return await this.authService.query(`
    INSERT INTO goals (goal_title, goal_ispoint, user_id) VALUES ("${title}", 0, ${userId})
    `);
  }

  async updateCheck(goalId: string) {
    const data = (
      await this.authService.query(`SELECT * FROM goals WHERE id = "${goalId}"`)
    )[0] as Goals;

    if (!data) {
      throw new UnauthorizedException('Not exists goals');
    }

    await this.authService.query(`
    UPDATE goals SET goal_ispoint = ${
      data.goal_ispoint ? 0 : 1
    } WHERE id = ${goalId}
    `);
  }

  async deleteGoal(goalId: string, userId: number) {
    const data = (
      await this.authService.query(`SELECT * FROM goals WHERE id = "${goalId}"`)
    )[0] as Goals;

    if (!data) {
      throw new UnauthorizedException('Not exists goals');
    }

    if (data.user_id !== userId) {
      throw new BadRequestException('Not your goal');
    }

    await this.authService.query(`
    DELETE FROM goals WHERE id = ${goalId}
    `);
  }
}
