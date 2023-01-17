import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodolistService {
  constructor(private readonly authService: AuthService) {}

  async getAllTodolist(goalId: string) {
    return await this.authService.query(`
        SELECT todolist.id, todolist_contents, todolist_date, todolist_color, isCheckedTodo FROM todolist INNER JOIN goals
        ON goals.id = todolist.goal_id
        WHERE goal_id = ${goalId}`);
  }

  async createTodolist(createTodoDto: CreateTodoDto) {
    const { contents, color, goalId } = createTodoDto;
    await this.authService.query(`
    INSERT INTO todolist (todolist_contents, todolist_color, goal_id) VALUES ("${contents}", "${color}", ${goalId})
    `);
  }

  async updateCheckTodolist(todolistId: string) {
    const data = (
      await this.authService.query(
        `SELECT * FROM todolist WHERE id = "${todolistId}"`,
      )
    )[0];

    if (!data) {
      throw new UnauthorizedException('Not exists goals');
    }

    await this.authService.query(`
    UPDATE todolist SET isCheckedTodo = ${
      data.isCheckedTodo ? 0 : 1
    } WHERE id = ${todolistId}
    `);

    return this.authService.query(`
    SELECT * FROM todolist WHERE id = "${todolistId}"
    `);
  }

  async deleteTodo(todolistId: string) {
    const data = await this.authService.query(`
    SELECT * FROM todolist WHERE id = "${todolistId}"
    `);

    const goalId = data[0].goal_id;

    await this.authService.query(`
    DELETE FROM todolist WHERE id = ${todolistId}
    `);

    return goalId;
  }
}
