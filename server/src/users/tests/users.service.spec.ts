import 'reflect-metadata';
import { Container } from 'inversify';
import { QueryResult } from 'pg';
import { IConfigService } from '../../config/config.service.interface';
import { IUserRepository } from '../users.repository.interface';
import { IUserService } from '../users.service.interface';
import { TYPES } from '../../Injection/types';
import { UserService } from '../users.service';
import { UserModel } from '../../Interfaces/enties.interfaces';

const ConfigServiceMock: IConfigService = {
  get: jest.fn(),
  getDBConfig: jest.fn(),
};

const UsersRepositoryMock: IUserRepository = {
  find: jest.fn(),
  create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUserRepository;
let usersService: IUserService;

beforeAll(() => {
  container.bind<IUserService>(TYPES.UserService).to(UserService);
  container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
  container.bind<IUserRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

  configService = container.get<IConfigService>(TYPES.ConfigService);
  usersRepository = container.get<IUserRepository>(TYPES.UsersRepository);
  usersService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | boolean;
let userLogin: UserModel | boolean;

describe('User Service', () => {
  it('createUser', async () => {
    configService.get = jest.fn().mockReturnValueOnce('1');
    usersRepository.create = jest.fn().mockImplementationOnce(
      (name:string, password:string): { rows: { user_password: string; user_name: string; id: number }[] } => (
        {
          rows: [
            {
              user_name: name,
              user_password: password,
              id: 1,
            },
          ],
        }
      ),
    );
    usersRepository.find = jest.fn().mockImplementationOnce(
      (): { rows: { user_password: string; user_name: string; id: number }[] } => (
        {
          rows: [
          ],
        }
      ),
    );
    createdUser = await usersService.createUser('Volodia', 'Volodia05020234>');
    if (typeof createdUser !== 'boolean') {
      expect(createdUser.id).toEqual(1);
      expect(createdUser?.user_password).not.toEqual('1');
    }
  });

  it('createUser when user exist', async () => {
    configService.get = jest.fn().mockReturnValueOnce('1');
    usersRepository.create = jest.fn().mockImplementationOnce(
      (name:string, password:string): { rows: { user_password: string; user_name: string; id: number }[] } => (
        {
          rows: [
            {
              user_name: name,
              user_password: password,
              id: 1,
            },
          ],
        }
      ),
    );
    usersRepository.find = jest.fn().mockImplementationOnce(
      (name : string): { rows: { user_password: string; user_name: string; id: number }[] } => (
        {
          rows: [
            {
              user_name: name,
              user_password: 'Volodia05020234>',
              id: 1,
            },
          ],
        }
      ),
    );
    createdUser = await usersService.createUser('Volodia', 'Volodia05020234>');
    expect(createdUser).toBeFalsy();
  });

  it('Login user with correct data', async () => {
    configService.get = jest.fn().mockReturnValueOnce('1');
    usersRepository.find = jest.fn().mockImplementationOnce(
      (name : string): { rows: { user_password: string; user_name: string; id: number }[] } => (
        {
          rows: [
            {
              user_name: name,
              user_password: '$2b$10$BkzdpS0Ted8i0iGauGDreejzxl9ZGllojKZpnUb1aQLdPjmaKQKxm',
              id: 1,
            },
          ],
        }
      ),
    );
    userLogin = await usersService.login('Volodia', 'Volodia05020234>');
    if (typeof userLogin !== 'boolean') {
      expect(userLogin.user_name).toEqual('Volodia');
      expect(userLogin.user_password).toEqual('Volodia05020234>');
    }
  });

  it('Login user with incorrect data', async () => {
    configService.get = jest.fn().mockReturnValueOnce('1');
    usersRepository.find = jest.fn().mockImplementationOnce(
      (name : string): { rows: { user_password: string; user_name: string; id: number }[] } => (
        {
          rows: [
            {
              user_name: name,
              user_password: '$2b$10$BkzdpS0Ted8i0iGauGDreejzxl9ZGllojKZpnUb1aQLdPjmaKQKx',
              id: 1,
            },
          ],
        }
      ),
    );
    userLogin = await usersService.login('Volodia', 'Volodia05?');

    if (typeof userLogin === 'boolean') {
      expect(userLogin).toBeFalsy();
    }
  });
});
