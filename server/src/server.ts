import { Container } from 'inversify';
import { App } from './app';
import { appBindings } from './Injection/injection';
import { TYPES } from './Injection/types';
import { ToDoController } from './App/ToDoLists/todo.controller';
import { TasksController } from './App/Tasks/tasks.controller';
import { UserController } from './App/Users/users.controller';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

async function bootstrap() : Promise<IBootstrapReturn> {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  const toDoController = appContainer.get<ToDoController>(TYPES.ToDoController);
  const tasksController = appContainer.get<TasksController>(TYPES.TasksController);
  const userConroller = appContainer.get<UserController>(TYPES.UserController);
  const controllers = [
    toDoController.router,
    tasksController.router,
    userConroller.router,
  ];

  await app.init(controllers);
  return { appContainer, app };
}

export const boot = bootstrap();
