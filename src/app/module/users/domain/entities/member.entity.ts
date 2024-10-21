export class MemberEntity {
  id: number;
  code: string;
  name: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<MemberEntity>) {
    Object.assign(this, partial);
  }

  getId(): Object {
    return {
      id: this.id,
    };
  }

  getCode(): Object {
    return {
      code: this.code,
    };
  }

  getName(): Object {
    return {
      name: this.name,
    };
  }
}
