import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client'; // Atau model User yang kamu pakai
import { AuthService } from './auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }
  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }
  async deserializeUser(userId: number, done: CallableFunction) {
    const user = await this.authService.findUserById(userId);
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  }
}
