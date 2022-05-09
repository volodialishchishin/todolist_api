import express, {Express} from 'express';
import 'reflect-metadata';
import {Server} from 'http';
import {ToDoRouter} from './ToDoLists/todo.router';
import cors from 'cors';
import {inject, injectable} from 'inversify';
import {TYPES} from './types';
import cookieParser from 'cookie-parser';
import { UserRouter } from './users/userRouter';

@injectable()
export class App  {
	app: Express;
	server: Server;
	port: number;

	constructor(
        @inject(TYPES.ToDoRouter) private TodoRouter: ToDoRouter,
        @inject(TYPES.UserRouter) private UserRouter: UserRouter,
	) {
		this.app = express();
	}

	useRoutes(): void {
		this.app.use('/', this.TodoRouter.router);
		this.app.use('/', this.UserRouter.router);
	}

	useJson():void{
		this.app.use(express.json());
	}

	useCookie():void{
		this.app.use(cookieParser());
	}

	useCors() : void{
		this.app.use(cors({
			credentials: true,
			origin: process.env.CLIENT_URL
		}));
	}

	init() {
		this.useJson();
		this.useCors();
		this.useRoutes();
		this.useCookie();
		this.server = this.app.listen(process.env.PORT);
		console.log('Server listening' + process.env.PORT);
	}
}
