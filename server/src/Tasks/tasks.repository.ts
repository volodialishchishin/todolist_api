import { inject, injectable } from 'inversify';
import { QueryResult } from 'pg';
import { ITasksRepository } from './Interfaces/tasks.repository.interface';
import { TaskType } from '../Interfaces/enties.interfaces';
import { TYPES } from '../Injection/types';
import { DataBase } from '../Database/db';

@injectable()
export class TasksRepository implements ITasksRepository {
  constructor(
    @inject(TYPES.DataBase) private db:DataBase,
  ) {
  }

  async insertTask(title: string, id: string, status: number, userId:string): Promise<QueryResult<TaskType>> {
    return this.db.dbInit().query('INSERT INTO tasks(title,todoListId,status,userid) values($1,$2,$3,$4) RETURNING * ', [title, id, status, userId]);
  }

  async selectTasks(id: string, userId:string): Promise<QueryResult<TaskType>> {
    return this.db.dbInit().query('SELECT * FROM tasks where todolistid = $1 and userid = $2', [id, userId]);
  }

  async updateTask(title: string, status: string, id: string, taskid: string, userId:string): Promise<QueryResult<TaskType>> {
    return this.db.dbInit().query('UPDATE tasks SET title=$1 , status = $2   where todolistid = $3 and id = $4 and userid = $5 RETURNING *', [title, status, id, taskid, userId]);
  }

  async deleteTask(id: string, taskid: string, userId:string): Promise<QueryResult<TaskType>> {
    return this.db.dbInit().query('DELETE  FROM tasks where todolistid = $1 and id = $2 and userid = $3', [id, taskid, userId]);
  }
}
