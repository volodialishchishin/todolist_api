import { inject, injectable } from 'inversify';
import { ITasksService } from './interfaces/tasks.service.interface';
import { TaskType } from '../Interfaces/enties.interfaces';
import { TYPES } from '../Injection/types';
import { ITasksRepository } from './interfaces/tasks.repository.interface';

@injectable()
export class TasksService implements ITasksService {
  constructor(@inject(TYPES.TasksRepository) private TasksRepository: ITasksRepository) {}

  async getTasks(id: string): Promise<TaskType[]> {
    const tasks = await this.TasksRepository.selectTasks(id);
    if (!tasks.rows.length) {
      throw new Error();
    }
    return tasks.rows;
  }

  async deleteTask(id: string, taskid: string): Promise<TaskType> {
    const task = await this.TasksRepository.deleteTask(id, taskid);
    return task.rows[0];
  }

  async createTask(title: string, id: string, status: number): Promise<TaskType> {
    if (!title) {
      throw new Error();
    }
    const task = await this.TasksRepository.insertTask(title, id, status);
    return task.rows[0];
  }

  async updateTask(title: string, status: string, id: string, taskid: string): Promise<TaskType> {
    const task = await this.TasksRepository.updateTask(title, status, id, taskid);
    if (!title || !status) {
      throw new Error();
    }
    return task.rows[0];
  }
}
