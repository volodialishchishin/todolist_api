import { QueryResult } from 'pg';
import { TaskType } from '../../Interfaces/enties.interfaces';

export class ITasksRepository {
  insertTask: (title: string, id: string, status: number) => Promise<QueryResult<TaskType>>;

  selectTasks: (id: string) => Promise<QueryResult<TaskType>>;

  updateTask: (title: string, status: string, id: string, taskid: string) => Promise<QueryResult<TaskType>>;

  deleteTask: (id: string, taskid: string) => Promise<QueryResult<TaskType>>;
}
