import { Module } from '@nestjs/common';
import { UserRepository } from './infra/repositories/user.repository';
import { PrismaModule } from 'src/app/prisma/prisma.module';
import { UserService } from './domain/services/user.service';

@Module({
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UsersModule {}
