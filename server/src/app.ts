import express, { Express, json } from 'express';
import 'reflect-metadata';
import { Server } from 'http';
import cors from 'cors';
import { inject, injectable } from 'inversify';
import cookieParser from 'cookie-parser';
import { UserController } from './users/users.controller';
import { AuthMiddleware } from './Middlewares/authMiddleware';
import { IConfigService } from './config/config.service.interface';
import { TYPES } from './Injection/types';
import { ToDoController } from './ToDoLists/todo.controller';
import { TasksController } from './Tasks/tasks.controller';
import { DataBase } from './database/db';
import { IExeptionFilter } from './errors/exeption.filter.interface';

@injectable()
export class App {
  app: Express;

  server: Server;

  port: number;

  constructor(
    @inject(TYPES.ToDoController) private toDoController: ToDoController,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.TasksController) private tasksController: TasksController,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.DataBase) private db: DataBase,
  ) {
    this.app = express();
  }

  useRoutes(): void {
    this.app.use('/', this.toDoController.router);
    this.app.use('/', this.userController.router);
    this.app.use('/', this.tasksController.router);
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

  async useDB() {
    try {
      await this.db.dbInit();
      console.log('db connected');
    } catch (e) {
      console.log(e);
    }
  }

  useExeptionFilters(): void {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  async init() {
    await this.useDB();
    this.useMiddleware();
    this.useCors();
    this.useRoutes();
    this.useCookie();
    this.useExeptionFilters();
    this.server = this.app.listen(this.configService.get('PORT'));
    console.log(`Server listening${this.configService.get('PORT')}`);
  }

  public close(): void {
    this.server.close();
  }
}
