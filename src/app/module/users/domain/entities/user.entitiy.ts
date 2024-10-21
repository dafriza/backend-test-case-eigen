import * as bcrypt from 'bcrypt';
import { MemberEntity } from './member.entity';
export class UserEntity {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  member: MemberEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  getId(): Object {
    return {
      id: this.id,
    };
  }

  getUsername(): Object {
    return {
      username: this.username,
    };
  }

  getPassword(): Object {
    return {
      password: this.password,
    };
  }

  getDataUser(): Object {
    return {
      username: this.username,
      name: this.member.name,
      code: this.member.code,
    };
  }

  storeData(): Object {
    return {
      username: this.username,
      password: bcrypt.hash(this.password, 10),
    };
  }
}
