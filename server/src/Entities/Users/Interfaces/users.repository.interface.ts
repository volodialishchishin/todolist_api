import { QueryResult } from 'pg';
import { UserModel } from '../../../Interfaces/enties.interfaces';

export interface IUserRepository {
  create: (name: string, password: string) => Promise<QueryResult<UserModel>>;
  find: (name: string) => Promise<QueryResult<UserModel>>;
}
