import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { dir, log } from 'console';
import { PrismaService } from 'src/app/prisma/prisma.service';
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async all(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async find(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: id },
      include: { member: true },
    });
  }

  async findUser(username: string): Promise<User> {
    const findUsername = await this.prisma.user.findUnique({
      include: {
        member: true,
      },
      where: {
        username: username,
      },
    });
    return findUsername;
  }
}
