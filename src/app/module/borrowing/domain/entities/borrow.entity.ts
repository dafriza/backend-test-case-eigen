import { Expose, Transform } from 'class-transformer';
import { BookEntity } from 'src/app/module/books/domain/entities/book.entity';
import { MemberEntity } from 'src/app/module/users/domain/entities/member.entity';

export class BorrowEntity {
  id: number;

  @Expose()
  @Transform(({ value }) => {
    switch (value) {
      case 1:
        return 'Ready to borrow';
      case 2:
        return 'On borrowing';
      default:
        return 'On state';
    }
  })
  status: number;

  @Expose()
  bookId: number;

  @Expose()
  book?: BookEntity;

  @Expose()
  memberId: number;

  @Expose()
  member?: MemberEntity;

  createdAt: Date;

  @Expose()
  @Transform(({ value }) => `On Borrow - ${value}`)
  updatedAt: Date;

  constructor(partial: Partial<BorrowEntity>) {
    Object.assign(this, partial);
  }

  getId(): Object {
    return {
      id: this.id,
    };
  }
}
