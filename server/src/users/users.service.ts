import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { IConfigService } from '../config/config.service.interface';
import { UsersRepository } from './users.repository';
import { UserModel } from '../Interfaces/enties.interfaces';
import { IUserService } from './users.service.interface';
import { TYPES } from '../Injection/types';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: UsersRepository,
  ) {
  }

  async createUser(name: string, password: string): Promise<UserModel | boolean> {
    const passwordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const salt = this.configService.get('SALT');
    if (passwordValidation.test(password)) {
      const hashPassword = await bcrypt.hash(password, Number(salt));
      const existedUser = await this.usersRepository.find(name);
      if (existedUser.rows.length) {
        return false;
      }
      const user = await this.usersRepository.create(name,hashPassword)
      return user.rows[0];
    }
    else{
      return false;
    }
  }

  async login(name: string, password: string): Promise<UserModel | boolean> {
    const existedUser = await this.usersRepository.find(name);
    if (!existedUser.rows.length){
      return  false;
    }
    if (!bcrypt.compareSync(password, existedUser.rows[0].user_password)) {
      return false;
    }
    return existedUser.rows[0];
  }
}
