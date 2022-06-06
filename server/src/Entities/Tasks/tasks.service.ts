import { inject, injectable } from 'inversify';
import { ITasksService } from './Interfaces/tasks.service.interface';
import { TaskType } from '../../Interfaces/enties.interfaces';
import { TYPES } from '../../Injection/types';
import { ITasksRepository } from './Interfaces/tasks.repository.interface';

@injectable()
export class TasksService implements ITasksService {
  constructor(@inject(TYPES.TasksRepository) private TasksRepository: ITasksRepository) {}

  async getTasks(id: string, userId:string): Promise<TaskType[]> {
    const tasks = await this.TasksRepository.selectTasks(id, userId);
    if (!tasks.rows.length) {
      throw new Error();
    }
    return tasks.rows;
  }

  async deleteTask(id: string, taskid: string,userId:string): Promise<TaskType> {
    const task = await this.TasksRepository.deleteTask(id, taskid, userId);
    return task.rows[0];
  }

  async createTask(title: string, id: string, status: number, userId:string): Promise<TaskType> {
    const task = await this.TasksRepository.insertTask(title, id, status, userId);
    return task.rows[0];
  }

  async updateTask(title: string, status: string, id: string, taskid: string, userId:string): Promise<TaskType> {
    const task = await this.TasksRepository.updateTask(title, status, id, taskid, userId);
    if (!title || !status) {
      throw new Error();
    }
    return task.rows[0];
  }
}
