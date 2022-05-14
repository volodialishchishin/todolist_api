import { injectable } from 'inversify';
import { QueryResult } from 'pg';
import db from '../db';
import { UserModel } from '../interfaces/enties.interfaces';
import { IUserRepository } from './users.repository.interface';

@injectable()
export class UsersRepository implements IUserRepository {
  async create(name: string, password: string): Promise<QueryResult<UserModel>> {
    return db.query('INSERT INTO users(user_name,user_password) values($1,$2) RETURNING * ', [name, password]);
  }

  async find(name: string): Promise<QueryResult<UserModel>> {
    return db.query('SELECT * FROM users where user_name = $1', [name]);
  }
}
