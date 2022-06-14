import { User } from '../../../Database/Enteties/User';

export interface IUserRepository {
  create: (name: string, password: string) => Promise<User>
  find: (name: string) => Promise<User | null>
}
