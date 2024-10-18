import { Module } from '@nestjs/common';
import { AuthModule } from 'src/app/auth/auth.module';
import { BooksModule } from 'src/app/module/books/books.module';
import { BorrowingModule } from 'src/app/module/borrowing/borrowing.module';
import { UsersModule } from '../module/users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    BorrowingModule,
    BooksModule,
    UsersModule,
    PrismaModule,
  ],
})
export class CommonModule {}
