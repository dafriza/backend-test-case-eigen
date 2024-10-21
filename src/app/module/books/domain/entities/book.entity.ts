import { Expose, Transform } from 'class-transformer';
import { BorrowEntity } from 'src/app/module/borrowing/domain/entities/borrow.entity';

export class BookEntity {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  stock: number;

  @Expose()
  borrows: BorrowEntity;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<BookEntity>) {
    Object.assign(this, partial);
  }

  getId(): Object {
    return {
      id: this.id,
    };
  }
}
