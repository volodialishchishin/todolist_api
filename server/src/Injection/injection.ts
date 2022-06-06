import { ContainerModule, interfaces } from 'inversify';
import { App } from '../app';
import { TYPES } from './types';
import { ToDoController } from '../ToDoLists/todo.controller';
import { ToDoService } from '../ToDoLists/todo.service';
import { ToDoRepository } from '../ToDoLists/todo.repository';
import { UserController } from '../Users/users.controller';
import { UserService } from '../Users/users.service';
import { IConfigService } from '../Config/config.service.interface';
import { ConfigService } from '../Config/config.service';
import { UsersRepository } from '../Users/users.repository';
import { ITasksController } from '../Tasks/Interfaces/tasks.controller.interface';
import { TasksController } from '../Tasks/tasks.controller';
import { ITasksService } from '../Tasks/Interfaces/tasks.service.interface';
import { TasksService } from '../Tasks/tasks.service';
import { ITasksRepository } from '../Tasks/Interfaces/tasks.repository.interface';
import { IUserService } from '../Users/Interfaces/users.service.interface';
import { TasksRepository } from '../Tasks/tasks.repository';
import { DataBase } from '../Database/db';
import { ExeptionFilter } from '../Errors/exeption.filter';
import { IExeptionFilter } from '../Errors/exeption.filter.interface';
import { IUserController } from '../Users/Interfaces/users.controller.interface';
import { IUserRepository } from '../Users/Interfaces/users.repository.interface';
import { IToDoService } from '../ToDoLists/Interfaces/todo.service.interface';
import { IToDoRepository } from '../ToDoLists/Interfaces/todo.repository.interface';
import { IToDoController } from '../ToDoLists/Interfaces/todo.controller.interface';

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
