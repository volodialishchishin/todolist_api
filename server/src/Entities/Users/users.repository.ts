import { inject, injectable } from 'inversify';
import { QueryResult } from 'pg';
import { UserModel } from '../../Interfaces/enties.interfaces';
import { TYPES } from '../../Injection/types';
import { DataBase } from '../../Common/db';
import { IUserRepository } from './Interfaces/users.repository.interface';

@injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @inject(TYPES.DataBase) private db:DataBase,
  ) {
  }

  async create(name: string, password: string): Promise<QueryResult<UserModel>> {
    return this.db.dbInit().query('INSERT INTO Users(user_name,user_password) values($1,$2) RETURNING * ', [name, password]);
  }

  async find(name: string): Promise<QueryResult<UserModel>> {
    return this.db.dbInit().query('SELECT * FROM Users where user_name = $1', [name]);
  }
}
