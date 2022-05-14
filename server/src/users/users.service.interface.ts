import { QueryResult } from 'pg';
import { UserModel } from '../interfaces/enties.interfaces';

export interface IUserService {
  createUser: (name: string, password: string) => Promise<QueryResult<UserModel> | null>;
  login: (name: string, password: string) => Promise<UserModel | boolean>;
}
