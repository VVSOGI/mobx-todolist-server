import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { SignUpUsersDto } from './dto/signup-users.dto';

@Injectable()
export class UsersService {
  private connection: mysql.Connection;

  constructor() {
    this.createConnection();
  }

  async createConnection() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'todolist',
    });
  }

  async closeConnection() {
    await this.connection.end();
  }

  async query(sql: string, params: any[] = []) {
    const [rows] = await this.connection.execute(sql, params);
    return rows;
  }

  getAllUsers() {
    return this.query('SELECT * FROM users');
  }

  async signIn(email: string, password: string) {
    const users = await this.query(
      `SELECT * FROM users 
      WHERE users.email="${email}"
      AND users.password="${password}"
      `,
    );

    return users;
  }

  async signUp(signUpUsersDto: SignUpUsersDto) {
    const { email, username, password, doubleCheck } = signUpUsersDto;
    if (doubleCheck !== password) {
      throw new BadRequestException('Password가 일치하지 않습니다.');
    }

    const isExistsEmail = (
      (await this.query(
        `SELECT * FROM users WHERE users.email="${email}"`,
      )) as Array<any>
    ).length;

    if (isExistsEmail) {
      throw new ConflictException('exists user');
    }

    this.query(
      `INSERT INTO users (username, email, password)
      VALUES ("${username}", "${email}", "${password}")`,
    );

    return true;
  }
}
