import {App} from './app';
import {TodoController} from './ToDoLists/todo.controller';
import {ToDoService} from './ToDoLists/todo.service';
import {ToDoRepository} from './ToDoLists/todo.repository';
import {Container, ContainerModule, interfaces} from 'inversify';
import {TYPES} from './types';
import {ItodoRouter} from './ToDoLists/todo.controller.interface';
import {IToDoService} from './ToDoLists/todo.service.interface';
import {ItodoRepository} from './ToDoLists/todo.repository.interface';
import dotenv from 'dotenv';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { UserService } from './users/users.service';
import { UserController } from './users/users.controller';
import { UsersRepository } from './users/users.repository';
dotenv.config();

export interface IBootstrapReturn {
    appContainer: Container;
    app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<ItodoRouter>(TYPES.ToDoRouter).to(TodoController);
	bind<IToDoService>(TYPES.ToDoService).to(ToDoService);
	bind<ItodoRepository>(TYPES.ToDoRepository).to(ToDoRepository);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<UserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
});

function bootstrap() : IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return {appContainer, app};
}

export const {app, appContainer} = bootstrap();
