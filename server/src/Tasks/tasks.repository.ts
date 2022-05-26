import { inject, injectable } from 'inversify';
import { QueryResult } from 'pg';
import { ITasksRepository } from './interfaces/tasks.repository.interface';
import { TaskType } from '../Interfaces/enties.interfaces';
import { TYPES } from '../Injection/types';
import { DataBase } from '../database/db';

@injectable()
export class TasksRepository implements ITasksRepository {
  constructor(
    @inject(TYPES.DataBase) private db:DataBase,
  ) {
  }

  async insertTask(title: string, id: string, status: number): Promise<QueryResult<TaskType>> {
    return this.db.dbInit().query('INSERT INTO tasks(title,todolistid,status) values($1,$2,$3) RETURNING * ', [title, id, status]);
  }

  async selectTasks(id: string): Promise<QueryResult<TaskType>> {
    return this.db.dbInit().query('SELECT * FROM tasks where todolistid = $1', [id]);
  }

  async updateTask(title: string, status: string, id: string, taskid: string): Promise<QueryResult<TaskType>> {
    return this.db.dbInit().query('UPDATE tasks SET title=$1 , status = $2   where todolistid = $3 and id = $4 RETURNING *', [title, status, id, taskid]);
  }

  async deleteTask(id: string, taskid: string): Promise<QueryResult<TaskType>> {
    return this.db.dbInit().query('DELETE  FROM tasks where todolistid = $1 and id = $2', [id, taskid]);
  }
}
