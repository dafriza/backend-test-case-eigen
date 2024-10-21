import { Injectable } from '@nestjs/common';
import { Borrow } from '@prisma/client';
import { PrismaService } from 'src/app/prisma/prisma.service';
@Injectable()
export class BorrowRepository {
  constructor(private readonly prisma: PrismaService) {}

  async all(): Promise<Borrow[]> {
    return this.prisma.borrow.findMany();
  }

  async find(id: number): Promise<Borrow> {
    return this.prisma.borrow.findFirst({
      where: {
        id: id,
      },
      include: {
        member: true,
        book: true,
      },
    });
  }

  async borrow(bookId: number, memberID: number): Promise<Borrow> {
    const borrowBook = await this.prisma.borrow.create({
      data: {
        status: 1,
        bookId: bookId,
        memberId: memberID,
      },
    });
    return borrowBook;
  }
}
