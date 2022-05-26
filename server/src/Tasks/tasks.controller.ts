import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ITasksService } from './interfaces/tasks.service.interface';
import { ITasksController } from './interfaces/tasks.controller.interface';
import { TYPES } from '../Injection/types';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class TasksController extends BaseController implements ITasksController {
  constructor(
    @inject(TYPES.TasksService) private TasksService: ITasksService,
  ) {
    super();
    this.bindRoutes([
      { path: '/todolists/:id/tasks', method: 'get', func: this.getTasks },
      { path: '/todolists/:id/tasks/:taskid', method: 'delete', func: this.deleteTask },
      { path: '/todolists/:id/tasks/:taskid', method: 'put', func: this.updateTask },
      { path: '/todolists/:id/tasks', method: 'post', func: this.createTask },
    ]);
  }

  async getTasks(req: Request, res: Response, next:NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const tasks = await this.TasksService.getTasks(id);
      res.json(tasks);
    } catch (e) {
      next(HTTPError.NoTodo());
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { taskid } = req.params;
    const newTask = await this.TasksService.deleteTask(id, taskid);
    res.json(newTask);
  }

  async createTask(req: Request, res: Response, next:NextFunction): Promise<void> {
    const { id } = req.params;
    const status = 0;
    const { title } = req.body;
    try {
      const newTask = await this.TasksService.createTask(title, id, status);
      res.json(newTask);
    } catch (e) {
      next(HTTPError.NoTitle());
    }
  }

  async updateTask(req: Request, res: Response, next:NextFunction): Promise<void> {
    const { id } = req.params;
    const { taskid } = req.params;
    const { title, status } = req.body;
    try {
      const updatedTask = await this.TasksService.updateTask(title, status, id, taskid);
      res.json(updatedTask);
    } catch (e) {
      next(HTTPError.NoTitle());
    }
  }
}
