import { ContainerModule, interfaces } from 'inversify';
import { App } from '../app';
import { TYPES } from './types';
import { ToDoController } from '../ToDoLists/todo.controller';
import { ToDoService } from '../ToDoLists/todo.service';
import { ToDoRepository } from '../ToDoLists/todo.repository';
import { UserController } from '../users/users.controller';
import { UserService } from '../users/users.service';
import { IConfigService } from '../config/config.service.interface';
import { ConfigService } from '../config/config.service';
import { UsersRepository } from '../users/users.repository';
import { ITasksController } from '../Tasks/interfaces/tasks.controller.interface';
import { TasksController } from '../Tasks/tasks.controller';
import { ITasksService } from '../Tasks/interfaces/tasks.service.interface';
import { TasksService } from '../Tasks/tasks.service';
import { ITasksRepository } from '../Tasks/interfaces/tasks.repository.interface';
import { IUserService } from '../users/interfaces/users.service.interface';
import { TasksRepository } from '../Tasks/tasks.repository';
import { DataBase } from '../database/db';
import { ExeptionFilter } from '../errors/exeption.filter';
import { IExeptionFilter } from '../errors/exeption.filter.interface';
import { IUserController } from '../users/interfaces/users.controller.interface';
import { IUserRepository } from '../users/interfaces/users.repository.interface';
import { IToDoService } from '../ToDoLists/interfaces/todo.service.interface';
import { IToDoRepository } from '../ToDoLists/interfaces/todo.repository.interface';
import { IToDoController } from '../ToDoLists/interfaces/todo.controller.interface';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);

  bind<IToDoController>(TYPES.ToDoController).to(ToDoController);
  bind<IToDoService>(TYPES.ToDoService).to(ToDoService);
  bind<IToDoRepository>(TYPES.ToDoRepository).to(ToDoRepository);

  bind<ITasksController>(TYPES.TasksController).to(TasksController);
  bind<ITasksService>(TYPES.TasksService).to(TasksService);
  bind<ITasksRepository>(TYPES.TasksRepository).to(TasksRepository);

  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IUserRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();

  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<DataBase>(TYPES.DataBase).to(DataBase).inSingletonScope();
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
});
