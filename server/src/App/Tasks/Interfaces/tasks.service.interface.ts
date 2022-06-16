import { DeleteResult, UpdateResult } from 'typeorm';
import { Task } from '../../../Database/Enteties/Task';

export interface ITasksService {

  getTasks: (id: string, userId:string) => Promise<Task[]>

  deleteTask: (id: string, taskid: string, userId:string) => Promise<DeleteResult>

  createTask: (title: string, id: string, status: number, userId:string) => Promise<Task>

  updateTask: (title: string, status: number, id: string, taskid: string, userId:string) => Promise<Task>
}
