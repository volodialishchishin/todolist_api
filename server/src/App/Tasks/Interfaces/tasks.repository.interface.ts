import { DeleteResult, UpdateResult } from 'typeorm';
import { Task } from '../../../Database/Enteties/Task';

export class ITasksRepository {
  insertTask: (title: string, id: string, status: number, userId:string) => Promise<Task>;

  selectTasks: (id: string, userId:string) => Promise<Task[]>;

  updateTask: (title: string, status: number, id: string, taskid: string, userId:string) => Promise<Task>;

  deleteTask: (id: string, taskid: string, userId:string) => Promise<DeleteResult>;
}
