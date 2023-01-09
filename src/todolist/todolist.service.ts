import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class TodolistService {
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

  getAllTodos() {
    return this.query('SELECT * FROM users');
  }
}
