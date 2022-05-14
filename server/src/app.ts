import express, { Express, json } from 'express';
import 'reflect-metadata';
import { Server } from 'http';
import cors from 'cors';
import { inject, injectable } from 'inversify';
import cookieParser from 'cookie-parser';
import { UserController } from './users/users.controller';
import { AuthMiddleware } from './middlewares/authMiddleware';
import { IConfigService } from './config/config.service.interface';
import { TYPES } from './Injection/types';
import { IToDoController } from './ToDoLists/todo.controller.interface';
import { ToDoController } from './ToDoLists/todo.controller';

@injectable()
export class App {
	app: Express;

	server: Server;

	port: number;

	constructor(
		@inject(TYPES.ToDoRouter) private TodoRouter: ToDoController,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = express();
	}

	useRoutes(): void {
		this.app.use('/', this.TodoRouter.router);
		this.app.use('/', this.userController.router);
	}

	useCookie():void {
		this.app.use(cookieParser());
	}

	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useCors() : void {
		this.app.use(cors({
			credentials: true,
			origin: this.configService.get('CLIENT_URL'),
		}));
	}

	init() {
		this.useMiddleware();
		this.useCors();
		this.useRoutes();
		this.useCookie();
		this.server = this.app.listen(this.configService.get('PORT'));
		console.log(`Server listening${this.configService.get('PORT')}`);
	}
}
