import { Module } from '@nestjs/common';
import { BookService } from './domain/services/book.service';
import { BookRepository } from './infra/repositories/book.repository';

@Module({
  providers: [BookService, BookRepository],
  exports: [BookService, BookRepository],
})
export class BooksModule {}
