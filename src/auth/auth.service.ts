import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as mysql from 'mysql2/promise';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { JwtPayload } from './auth.type';

@Injectable()
export class AuthService {
  private connection: mysql.Connection;

  constructor(private jwtService: JwtService) {
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

  async signIn(email: string, password: string) {
    const users = (await this.query(
      `SELECT * FROM users 
      WHERE users.email="${email}"
      AND users.password="${password}"
      `,
    )) as any[];

    if (!users.length) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      username: users[0].username,
    };
    const accessToken = await this.jwtService.sign(payload);

    return accessToken;
  }

  async signUp(authSignUpDto: AuthSignUpDto) {
    const { email, username, password, doubleCheck } = authSignUpDto;
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

  async findUserByUsername(username: string) {
    const user = (await this.query(`
      SELECT * FROM users WHERE users.username = "${username}"
    `)) as any[];

    const isUserExists = user.length;

    if (!isUserExists) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
