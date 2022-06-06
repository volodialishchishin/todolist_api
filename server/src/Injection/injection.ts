import { ContainerModule, interfaces } from 'inversify';
import { App } from '../app';
import { TYPES } from './types';
import { ToDoController } from '../Entities/ToDoLists/todo.controller';
import { ToDoService } from '../Entities/ToDoLists/todo.service';
import { ToDoRepository } from '../Entities/ToDoLists/todo.repository';
import { UserController } from '../Entities/Users/users.controller';
import { UserService } from '../Entities/Users/users.service';
import { IConfigService } from '../Config/config.service.interface';
import { ConfigService } from '../Config/config.service';
import { UsersRepository } from '../Entities/Users/users.repository';
import { ITasksController } from '../Entities/Tasks/Interfaces/tasks.controller.interface';
import { TasksController } from '../Entities/Tasks/tasks.controller';
import { ITasksService } from '../Entities/Tasks/Interfaces/tasks.service.interface';
import { TasksService } from '../Entities/Tasks/tasks.service';
import { ITasksRepository } from '../Entities/Tasks/Interfaces/tasks.repository.interface';
import { IUserService } from '../Entities/Users/Interfaces/users.service.interface';
import { TasksRepository } from '../Entities/Tasks/tasks.repository';
import { DataBase } from '../Common/db';
import { ErrorMiddleware } from '../Middlewares/errorMiddleware';
import { IExeptionFilter } from '../Middlewares/errorMiddleware.interface';
import { IUserController } from '../Entities/Users/Interfaces/users.controller.interface';
import { IUserRepository } from '../Entities/Users/Interfaces/users.repository.interface';
import { IToDoService } from '../Entities/ToDoLists/Interfaces/todo.service.interface';
import { IToDoRepository } from '../Entities/ToDoLists/Interfaces/todo.repository.interface';
import { IToDoController } from '../Entities/ToDoLists/Interfaces/todo.controller.interface';
import {LoggerService} from "../Common/logger/logger.service";
import {ILogger} from "../Common/logger/logger.interface";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();

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
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ErrorMiddleware);
});
