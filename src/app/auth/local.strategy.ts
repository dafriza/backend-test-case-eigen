import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { UserEntity } from '../module/users/domain/entities/user.entitiy';
import { dir, log } from 'console';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(); // Default strategy to use ussername and password
  }

  async validate(username: string, password: string): Promise<User> {
    const userEntity = new UserEntity({ username, password });
    try {
      const user = await this.authService.login(userEntity);
      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
