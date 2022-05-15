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
import { ITasksController } from '../Tasks/tasks.controller.interface';
import { TasksController } from '../Tasks/tasks.controller';
import { ITasksService } from '../Tasks/tasks.service.interface';
import { TasksService } from '../Tasks/tasks.service';
import { ITasksRepository } from '../Tasks/tasks.repository.interface';
import { IUserController } from '../users/users.controller.interface';
import { IUserService } from '../users/users.service.interface';
import { IUserRepository } from '../users/users.repository.interface';
import { TasksRepository } from '../Tasks/tasks.repository';
import { DataBase } from '../database/db';
import { ExeptionFilter } from '../errors/exeption.filter';
import { IExeptionFilter } from '../errors/exeption.filter.interface';

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
