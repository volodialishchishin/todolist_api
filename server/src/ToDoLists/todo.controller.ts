import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IToDoService } from './todo.service.interface';
import { IToDoController } from './todo.controller.interface';
import { TYPES } from '../Injection/types';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class ToDoController extends BaseController implements IToDoController {
  constructor(
    @inject(TYPES.ToDoService) private ToDoService: IToDoService,
  ) {
    super();
    this.bindRoutes([
      { path: '/todolists', method: 'get', func: this.getTodoLists },
      { path: '/todolists', method: 'post', func: this.createTodolist },
      { path: '/todolists/:id', method: 'delete', func: this.deleteTodolist },
      { path: '/todolists/:id', method: 'put', func: this.updateTodolist },
    ]);
  }

  async getTodoLists(req: Request, res: Response, next:NextFunction): Promise<any> {
    const { context: { id } } = req;
    const todolists = await this.ToDoService.getTodolists(id);
    if (!todolists) {
      return next(new HTTPError(400, 'User dont have any todolists'));
    }
    res.status(200).json(todolists);
  }

  async createTodolist(req: Request, res: Response, next:NextFunction): Promise<void> {
    const { title, userId } = req.body;
    const newtodolist = await this.ToDoService.createTodolist(title, userId);
    if (!newtodolist) {
      return next(new HTTPError(401, 'Please enter title', 'login'));
    }
    res.status(201).json(newtodolist);
  }

  async deleteTodolist(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const deletedToDolist = await this.ToDoService.deleteTodolist(id);
    res.status(200).json(deletedToDolist);
  }

  async updateTodolist(req: Request, res: Response, next:NextFunction): Promise<void> {
    const { id } = req.params;
    const { title } = req.body;
    const updatedToDolist = await this.ToDoService.updateTodolist(id, title);
    if (!updatedToDolist) {
      return next(new HTTPError(401, 'Please enter title', 'login'));
    }
    res.status(200).json(updatedToDolist);
  }
}
