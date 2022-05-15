import { inject, injectable } from 'inversify';
import { QueryResult } from 'pg';
import { ITasksService } from './tasks.service.interface';
import { TaskType } from '../Interfaces/enties.interfaces';
import { TYPES } from '../Injection/types';
import { ITasksRepository } from './tasks.repository.interface';
import {HTTPError} from "../errors/http-error.class";

@injectable()
export class TasksService implements ITasksService {
  constructor(@inject(TYPES.TasksRepository) private TasksRepository: ITasksRepository) {}

  async getTasks(id: string): Promise<TaskType[] | boolean> {
    const tasks = await this.TasksRepository.selectTasks(id);
    if (!tasks) {
      return false;
    }
    return tasks.rows;
  }

  async deleteTask(id: string, taskid: string): Promise<TaskType | boolean> {
    const task = await this.TasksRepository.deleteTask(id, taskid);
    return task.rows[0];
  }

  async createTask(title: string, id: string, status: number): Promise<TaskType | boolean> {
    if (!title) {
      return false;
    }
    const task = await this.TasksRepository.insertTask(title, id, status);
    return task.rows[0];
  }

  async updateTask(title: string, status: string, id: string, taskid: string): Promise<TaskType | boolean> {
    const task = await this.TasksRepository.updateTask(title, status, id, taskid);
    if (!title || !status) {
      return false;
    }
    return task.rows[0];
  }
}
