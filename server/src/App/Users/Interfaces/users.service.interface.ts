import { User } from '../../../Database/Enteties/User';

export interface IUserService {
  createUser: (name: string, password: string) => Promise<User | null>;
  login: (name: string, password: string) => Promise<User>;
}
