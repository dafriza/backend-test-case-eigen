import { Module } from '@nestjs/common';
import { BorrowRepository } from './infra/repositories/borrow.repository';
import { BorrowService } from './domain/services/borrow.service';
import { BookRepository } from '../books/infra/repositories/book.repository';
import { BooksModule } from '../books/books.module';

@Module({
  providers: [BorrowRepository, BorrowService],
  exports: [BorrowRepository, BorrowService],
  imports: [BooksModule],
})
export class BorrowingModule {}
