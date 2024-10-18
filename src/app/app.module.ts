import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserRepository } from './module/users/infra/repositories/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [PrismaModule, UserRepository],
})
export class AppModule {}
