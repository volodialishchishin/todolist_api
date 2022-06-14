import {injectable} from 'inversify';
import {IUserRepository} from './Interfaces/users.repository.interface';
import {User} from '../../Database/Enteties/User';

@injectable()
export class UsersRepository implements IUserRepository {

  async create(name: string, password: string): Promise<User> {
    const user = User.create({
      name,
      password,
    });
    await user.save();
    return user;
  }

  async find(name: string): Promise<User | null> {
    return await User.findOne({
      where: {
        name,
      },
    });
  }
}
