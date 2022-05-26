import { UserModel } from '../../Interfaces/enties.interfaces';

export interface IUserService {
  createUser: (name: string, password: string) => Promise<UserModel>;
  login: (name: string, password: string) => Promise<UserModel>;
}
