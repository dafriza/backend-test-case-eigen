import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/app/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async all(): Promise<User[] | null> {
    return this.prisma.user.findMany();
  }

  async find(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: id } });
  }
}
