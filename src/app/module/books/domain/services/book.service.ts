import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BookRepository } from '../../infra/repositories/book.repository';
import { plainToInstance } from 'class-transformer';
import { BookEntity } from '../entities/book.entity';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}
  async all(): Promise<Book[]> {
    const books = await this.bookRepository.all();
    const bookEntities = plainToInstance(BookEntity, books, {
      excludeExtraneousValues: true,
    });
    return bookEntities;
  }
  async find(id: number): Promise<Book> {
    const book = await this.bookRepository.find(id);
    const bookEntity = plainToInstance(BookEntity, book, {
      excludeExtraneousValues: true,
    });
    return bookEntity;
  }
}
