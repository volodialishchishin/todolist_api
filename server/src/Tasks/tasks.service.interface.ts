import { TaskType } from '../Interfaces/enties.interfaces';

export interface ITasksService {

  getTasks: (id: string) => Promise<TaskType[] | boolean>

  deleteTask: (id: string, taskid: string) => Promise<TaskType | boolean>

  createTask: (title: string, id: string, status: number) => Promise<TaskType | boolean>

  updateTask: (title: string, status: string, id: string, taskid: string) => Promise<TaskType | boolean>
}
