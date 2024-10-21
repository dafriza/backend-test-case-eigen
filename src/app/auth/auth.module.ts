import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../module/users/users.module';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './auth.session.serialize';
import { AuthenticatedGuard } from './auth.guard';

@Module({
  providers: [
    AuthService,
    LocalAuthGuard,
    LocalStrategy,
    SessionSerializer,
    AuthenticatedGuard,
  ],
  exports: [AuthService],
  imports: [UsersModule],
})
export class AuthModule {}
