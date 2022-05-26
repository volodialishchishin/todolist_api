import { TaskType } from '../../Interfaces/enties.interfaces';

export interface ITasksService {

  getTasks: (id: string) => Promise<TaskType[]>

  deleteTask: (id: string, taskid: string) => Promise<TaskType>

  createTask: (title: string, id: string, status: number) => Promise<TaskType>

  updateTask: (title: string, status: string, id: string, taskid: string) => Promise<TaskType>
}
