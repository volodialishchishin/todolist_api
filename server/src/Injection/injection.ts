import { ContainerModule, interfaces } from 'inversify';
import { App } from '../app';
import { TYPES } from './types';
import { ToDoController } from '../App/ToDoLists/todo.controller';
import { ToDoService } from '../App/ToDoLists/todo.service';
import { ToDoRepository } from '../App/ToDoLists/todo.repository';
import { UserController } from '../App/Users/users.controller';
import { UserService } from '../App/Users/users.service';
import { IConfigService } from '../Config/config.service.interface';
import { ConfigService } from '../Config/config.service';
import { UsersRepository } from '../App/Users/users.repository';
import { ITasksController } from '../App/Tasks/Interfaces/tasks.controller.interface';
import { TasksController } from '../App/Tasks/tasks.controller';
import { ITasksService } from '../App/Tasks/Interfaces/tasks.service.interface';
import { TasksService } from '../App/Tasks/tasks.service';
import { ITasksRepository } from '../App/Tasks/Interfaces/tasks.repository.interface';
import { IUserService } from '../App/Users/Interfaces/users.service.interface';
import { TasksRepository } from '../App/Tasks/tasks.repository';
import { ErrorMiddleware } from '../Middlewares/errorMiddleware';
import { IExeptionFilter } from '../Middlewares/errorMiddleware.interface';
import { IUserController } from '../App/Users/Interfaces/users.controller.interface';
import { IUserRepository } from '../App/Users/Interfaces/users.repository.interface';
import { IToDoService } from '../App/ToDoLists/Interfaces/todo.service.interface';
import { IToDoRepository } from '../App/ToDoLists/Interfaces/todo.repository.interface';
import { IToDoController } from '../App/ToDoLists/Interfaces/todo.controller.interface';
import { LoggerService } from '../Common/logger/logger.service';
import { ILogger } from '../Common/logger/logger.interface';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
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
  bind<IUserRepository>(TYPES.UsersRepository).to(UsersRepository);

  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ErrorMiddleware);
});
export {
  appBindings,
};
