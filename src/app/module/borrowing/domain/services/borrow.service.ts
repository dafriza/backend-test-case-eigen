import { Injectable, ParseIntPipe } from '@nestjs/common';
import { Book, Borrow, User } from '@prisma/client';
import { BorrowRepository } from '../../infra/repositories/borrow.repository';
import { BorrowEntity } from '../entities/borrow.entity';
import { plainToInstance } from 'class-transformer';
import { BookRepository } from 'src/app/module/books/infra/repositories/book.repository';
import { BookEntity } from 'src/app/module/books/domain/entities/book.entity';
import { UserEntity } from 'src/app/module/users/domain/entities/user.entitiy';
import { dir, log } from 'console';

@Injectable()
export class BorrowService {
  constructor(
    private readonly borrowRepository: BorrowRepository,
    private readonly bookRepository: BookRepository,
  ) {}
  async all(): Promise<Borrow[]> {
    const borrows = await this.borrowRepository.all();
    const borrowEnities = plainToInstance(BorrowEntity, borrows, {
      excludeExtraneousValues: true,
    });
    return borrowEnities;
  }
  async borrowBook(code: string, user: UserEntity): Promise<Book> {
    const bookFindByCode = await this.bookRepository.findByCode(code);
    const bookEntity = plainToInstance(BookEntity, bookFindByCode, {
      excludeExtraneousValues: true,
    });
    log('user');
    dir(user);
    log(user.getId()['id']);
    log('book');
    dir(bookEntity);
    log(bookEntity.getId()['id']);

    // borrow book
    this.borrowRepository.borrow(bookEntity.getId()['id'], user.getId()['id']);

    //update stock
    const bookStock = this.bookRepository.borrow(bookEntity.getId()['id']);
    return bookStock;
  }
}
