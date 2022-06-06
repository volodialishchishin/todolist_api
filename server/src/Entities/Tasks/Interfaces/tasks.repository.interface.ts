import { QueryResult } from 'pg';
import { TaskType } from '../../../Interfaces/enties.interfaces';

export class ITasksRepository {
  insertTask: (title: string, id: string, status: number, userId:string) => Promise<QueryResult<TaskType>>;

  selectTasks: (id: string, userId:string) => Promise<QueryResult<TaskType>>;

  updateTask: (title: string, status: string, id: string, taskid: string, userId:string) => Promise<QueryResult<TaskType>>;

  deleteTask: (id: string, taskid: string, userId:string) => Promise<QueryResult<TaskType>>;
}
