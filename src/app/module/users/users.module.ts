import { Module } from '@nestjs/common';
import { UserRepository } from './infra/repositories/user.repository';
import { PrismaModule } from 'src/app/prisma/prisma.module';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
