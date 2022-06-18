import express, { Express, json, Router } from 'express';
import 'reflect-metadata';
import { Server } from 'http';
import cors from 'cors';
import { inject, injectable } from 'inversify';
import cookieParser from 'cookie-parser';
import { AuthMiddleware } from './Middlewares/authMiddleware';
import { IConfigService } from './Config/config.service.interface';
import { TYPES } from './Injection/types';
import { db } from './Database/db';
import { IExeptionFilter } from './Middlewares/errorMiddleware.interface';
import { ILogger } from './Common/logger/logger.interface';

@injectable()
export class App {
  app: Express;

  server: Server;

  constructor(
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.ILogger) private logger: ILogger,
  ) {
    this.app = express();
  }

  useRoutes(routes:Array<Router>): void {
    routes.map((rout:Router) => this.app.use('/', rout));
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
      origin: 'http://localhost:3000',
    }));
  }

  useExeptionFilters(): void {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  async init(routes: Array<Router>) {
    await db.initialize().then(() => {
      this.logger.log('Data Source has been initialized!');
    }).catch((err) => {
      this.logger.log('Error during Data Source initialization', err);
    });
    this.useCors();
    this.useMiddleware();
    this.useRoutes(routes);
    this.useCookie();
    this.useExeptionFilters();
    this.server = this.app.listen(this.configService.get('PORT'));
    this.logger.log(`Server listening ${this.configService.get('PORT')}`);
  }

  public close(): void {
    this.server.close();
  }
}
