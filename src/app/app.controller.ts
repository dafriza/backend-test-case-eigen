import { Controller, Get } from '@nestjs/common';
import { UserRepository } from './module/users/infra/repositories/user.repository';
import { User } from '@prisma/client';

@Controller('api')
export class AppController {
  constructor(private readonly userRepository: UserRepository) {}
  @Get('/')
  async function(): Promise<User[] | null> {
    return this.userRepository.all();
  }
}
