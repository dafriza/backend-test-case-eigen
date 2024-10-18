import * as bcrypt from 'bcrypt';
export class User {
  constructor(
    private readonly id: number,
    private readonly username: string,
    private readonly password: string,
  ) {}

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

  storeData(): Object {
    return {
      username: this.username,
      password: bcrypt.hash(this.password, 10),
    };
  }
}
