import { TaskType } from '../../Interfaces/enties.interfaces';

export interface ITasksService {

  getTasks: (id: string, userId:string) => Promise<TaskType[]>

  deleteTask: (id: string, taskid: string, userId:string) => Promise<TaskType>

  createTask: (title: string, id: string, status: number, userId:string) => Promise<TaskType>

  updateTask: (title: string, status: string, id: string, taskid: string, userId:string) => Promise<TaskType>
}
