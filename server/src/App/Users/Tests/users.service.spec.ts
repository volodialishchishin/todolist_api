import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../../../Config/config.service.interface';
import { IUserService } from '../Interfaces/users.service.interface';
import { TYPES } from '../../../Injection/types';
import { UserService } from '../users.service';
import { UserModel } from '../../../Interfaces/enties.interfaces';
import { IUserRepository } from '../Interfaces/users.repository.interface';

describe('User Service', () => {
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

  let createdUser: UserModel;
  let userLogin: UserModel;

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
    createdUser = await usersService.createUser('Volodia', 'Volodia05020234?');
    expect(createdUser.id).toEqual(1);
    expect(createdUser?.user_password).not.toEqual('1');
  });

  it('createUser when user exist', async () => {
    configService.get = jest.fn().mockReturnValueOnce('1');
    usersRepository.create = jest.fn().mockImplementationOnce(
      (name:string, password:string): { rows: { user_password: string; user_name: string; id: number }[] } => (
        {
          rows: [
            {
              user_name: 'Volodiaaaaaa',
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
              user_name: 'name',
              user_password: 'Volodia05020234>',
              id: 1,
            },
          ],
        }
      ),
    );
    await expect(async () => {
      await usersService.createUser('Volodiaaaaaa', 'Volodia05020234?');
    }).rejects.toThrowError()
  });

  it('Login user with correct data', async () => {
    configService.get = jest.fn().mockReturnValueOnce('1');
    usersRepository.find = jest.fn().mockImplementationOnce(
      (name : string): { rows: { user_password: string; user_name: string; id: number }[] } => (
        {
          rows: [
            {
              user_name: name,
              user_password: '$2b$10$F3rp9z3bZIq1EgkaHk3FI.YO85K2KD6dcHJ79Cj.dpkJ0hL4Crvti',
              id: 1,
            },
          ],
        }
      ),
    );
    userLogin = await usersService.login('Volodia', 'Volodia0?553');
    expect(userLogin.user_name).toEqual('Volodia');
    expect(userLogin.user_password).toEqual('$2b$10$F3rp9z3bZIq1EgkaHk3FI.YO85K2KD6dcHJ79Cj.dpkJ0hL4Crvti');
  });

  it('Login user with incorrect data', async () => {
    configService.get = jest.fn().mockReturnValueOnce('1');
    usersRepository.find = jest.fn().mockImplementationOnce(
      (name : string): { rows: { user_password: string; user_name: string; id: number }[] } => (
        {
          rows: [
            {
              user_name: name,
              user_password: '$2b$10$F3rp9z3bZIq1EgkaHk3FI.YO85K2KD6dcHJ79Cj.dpkJ0hL4Crvt4i',
              id: 1,
            },
          ],
        }
      ),
    );

    await expect(async () => {
      await usersService.login('Volodia', 'Volodia0?553');
    }).rejects.toThrowError();
  });
});
