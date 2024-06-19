// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'username',
      password: bcrypt.hashSync('password', 10), // Hash the password
    },
  ];

  async findOne(username: string): Promise<any> {
    return this.users.find((user) => user.username === username);
  }
}
