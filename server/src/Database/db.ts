import Pool from 'pg';
import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import { TYPES } from '../Injection/types';
import { IConfigService } from '../Config/config.service.interface';
import { ILogger } from '../Common/logger/logger.interface';
import { User } from './Enteties/User';
import { Task } from './Enteties/Task';
import { ToDoList } from './Enteties/ToDoList';

@injectable()
export class DataBase {
  db:DataSource;

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.ILogger) private logger: ILogger,
  ) {}

  async dbInit() {
    this.db = new DataSource({
      type: 'postgres',
      username: this.configService.get('USER'),
      password: this.configService.get('PASSWORD'),
      host: this.configService.get('HOST'),
      port: Number(this.configService.get('DBPORT')),
      database: this.configService.get('DATABASE'),
      entities: [User, Task, ToDoList],
      synchronize: true,
    });

    this.db.initialize()
      .then(() => {
        this.logger.log('Data Source has been initialized!');
      })
      .catch((err) => {
        this.logger.error('Error during Data Source initialization', err);
      });
  }
}
