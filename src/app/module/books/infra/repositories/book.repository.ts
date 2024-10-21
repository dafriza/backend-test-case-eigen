import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/app/prisma/prisma.service';
@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async all(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async find(id: number): Promise<Book> {
    return this.prisma.book.findFirst({
      where: {
        id: id,
      },
      include: {
        borrows: true,
      },
    });
  }

  async findByCode(code: string): Promise<Book> {
    return this.prisma.book.findFirst({
      where: {
        code: code,
      },
      include: {
        borrows: true,
      },
    });
  }

  async borrow(id: number): Promise<Book> {
    return this.prisma.book.update({
      where: {
        id: id,
      },
      data: {
        stock: 0,
      },
    });
  }
}
