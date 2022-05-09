import {App} from './app';
import {ToDoRouter} from './ToDoLists/todo.router';
import {ToDoService} from './ToDoLists/todo.service';
import {ToDoRepository} from './ToDoLists/todo.repository';
import {Container, ContainerModule, interfaces} from 'inversify';
import {TYPES} from './types';
import {ItodoRouter} from './ToDoLists/todo.router.interface';
import {IToDoService} from './ToDoLists/todo.service.interface';
import {ItodoRepository} from './ToDoLists/todo.repository.interface';
import dotenv from 'dotenv';
import { UserRouter } from './users/userRouter';
dotenv.config();

export interface IBootstrapReturn {
    appContainer: Container;
    app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ItodoRouter>(TYPES.ToDoRouter).to(ToDoRouter);
	bind<IToDoService>(TYPES.ToDoService).to(ToDoService);
	bind<ItodoRepository>(TYPES.ToDoRepository).to(ToDoRepository);
	bind<UserRouter>(TYPES.UserRouter).to(UserRouter);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap() : IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return {appContainer, app};
}

export const {app, appContainer} = bootstrap();
