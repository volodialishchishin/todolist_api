import { ContainerModule, interfaces } from 'inversify';
import { App } from '../app';
import { TYPES } from './types';
import { IToDoController } from '../ToDoLists/todo.controller.interface';
import { ToDoController } from '../ToDoLists/todo.controller';
import { IToDoService } from '../ToDoLists/todo.service.interface';
import { ToDoService } from '../ToDoLists/todo.service';
import { IToDoRepository } from '../ToDoLists/todo.repository.interface';
import { ToDoRepository } from '../ToDoLists/todo.repository';
import { UserController } from '../users/users.controller';
import { UserService } from '../users/users.service';
import { IConfigService } from '../config/config.service.interface';
import { ConfigService } from '../config/config.service';
import { UsersRepository } from '../users/users.repository';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
  bind<IToDoController>(TYPES.ToDoRouter).to(ToDoController);
  bind<IToDoService>(TYPES.ToDoService).to(ToDoService);
  bind<IToDoRepository>(TYPES.ToDoRepository).to(ToDoRepository);
  bind<UserController>(TYPES.UserController).to(UserController);
  bind<UserService>(TYPES.UserService).to(UserService);
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
});
