import { DataSource } from 'typeorm';
import { User } from './Enteties/User';
import { ToDoList } from './Enteties/ToDoList';
import { Task } from './Enteties/Task';

export const db = new DataSource({
  type: 'postgres',
  username: 'postgres',
  password: 'Volodia05022003?',
  host: 'database-2.cvg37nufxkka.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'mydb',
  entities: [User, Task, ToDoList],
  synchronize: true,
  migrations: [
    './dist/src/migration/*.js',
  ],
});
