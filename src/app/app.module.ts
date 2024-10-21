import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';
import { UserRepository } from './module/users/infra/repositories/user.repository';
import { AuthService } from './auth/auth.service';
import { BookService } from './module/books/domain/services/book.service';
import { BookRepository } from './module/books/infra/repositories/book.repository';
import { BorrowService } from './module/borrowing/domain/services/borrow.service';
import { BorrowRepository } from './module/borrowing/infra/repositories/borrow.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AuthService,
    UserRepository,
    BookService,
    BookRepository,
    BorrowService,
    BorrowRepository,
  ],
})
export class AppModule {}
