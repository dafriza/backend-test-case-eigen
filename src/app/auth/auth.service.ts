import { Injectable } from '@nestjs/common';
import { UserRepository } from '../module/users/infra/repositories/user.repository';
import { User } from '@prisma/client';
import { UserEntity } from '../module/users/domain/entities/user.entitiy';
import * as bcrypt from 'bcrypt';
import { dir, log } from 'console';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async login(user: UserEntity): Promise<User> {
    // const user = new UserEntity(payload);
    const userData = await this.userRepository.findUser(
      user.getUsername()['username'],
    );
    if (!userData) throw new Error('User Not Found!');
    const isPasswordValid = await bcrypt.compare(
      user.getPassword()['password'],
      userData.password,
    );
    if (!isPasswordValid) throw new Error("Password isn't valid");
    return userData;
  }
  async findUserById(userId: number): Promise<User> {
    return await this.userRepository.find(userId);
  }
}
