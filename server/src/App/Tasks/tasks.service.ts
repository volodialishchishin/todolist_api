import { inject, injectable } from 'inversify';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ITasksService } from './Interfaces/tasks.service.interface';
import { TYPES } from '../../Injection/types';
import { ITasksRepository } from './Interfaces/tasks.repository.interface';
import { Task } from '../../Database/Enteties/Task';

@injectable()
export class TasksService implements ITasksService {
  constructor(@inject(TYPES.TasksRepository) private TasksRepository: ITasksRepository) {}

  async getTasks(id: string, userId:string): Promise<Task[]> {
    const tasks = await this.TasksRepository.selectTasks(id, userId);
    if (!tasks.length) {
      throw new Error();
    }
    return tasks;
  }

  async deleteTask(id: string, taskid: string, userId:string): Promise<DeleteResult> {
    const task = await this.TasksRepository.deleteTask(id, taskid, userId);
    return task;
  }

  async createTask(title: string, id: string, status: number, userId:string): Promise<Task> {
    const task = await this.TasksRepository.insertTask(title, id, status, userId);
    return task;
  }

  async updateTask(title: string, status: number, id: string, taskid: string, userId:string): Promise<UpdateResult> {
    const task = await this.TasksRepository.updateTask(title, status, id, taskid, userId);
    if (!title || !status) {
      throw new Error();
    }
    return task;
  }
}
