import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UsersRepository } from './users.repository';
import bcrypt from 'bcrypt';
import { UserModel } from '../interfaces/enties.interfaces';
import { QueryResult } from 'pg';
import { IUserService } from './users.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: UsersRepository,
	) {
	}

	async createUser(name: string, password: string): Promise<QueryResult<UserModel> | null> {
		const salt = this.configService.get('SALT');
		const hashPassword = await bcrypt.hash(password, Number(salt));
		const existedUser = await this.usersRepository.find(name);
		if (existedUser.rows.length) {
			return null;
		}
		return this.usersRepository.create(name, hashPassword);
	}

	async login(name: string, password: string): Promise<UserModel | boolean> {
		const existedUser = await this.usersRepository.find(name);
		if (!existedUser.rows.length) {
			return false;
		}
		if (!bcrypt.compareSync(password, existedUser.rows[0].user_password)) {
			return false;
		}
		return existedUser.rows[0];
	}
}
