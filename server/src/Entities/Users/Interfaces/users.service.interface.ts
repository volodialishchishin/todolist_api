import { UserModel } from '../../../Interfaces/enties.interfaces';

export interface IUserService {
  createUser: (name: string, password: string ) => Promise<UserModel | boolean>;
  login: (name: string, password: string) => Promise<UserModel>;
}
