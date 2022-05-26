import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../Injection/types';
import { HTTPError } from '../errors/http-error.class';
import { IToDoController } from './interfaces/todo.controller.interface';
import { IToDoService } from './interfaces/todo.service.interface';

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

  async getTodoLists(req: Request, res: Response, next:NextFunction): Promise<void> {
    const { context: { id } } = req;
    try {
      const todolists = await this.ToDoService.getTodolists(id);
      res.status(200).json(todolists);
    } catch (e) {
      next(HTTPError.NoTodo());
    }
  }

  async createTodolist(req: Request, res: Response, next:NextFunction): Promise<void> {
    const { title, userId } = req.body;
    try {
      const newToDoList = await this.ToDoService.createTodolist(title, userId);
      res.status(201).json(newToDoList);
    } catch (e) {
      next(HTTPError.NoTitle());
    }
  }

  async deleteTodolist(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const deletedToDolist = await this.ToDoService.deleteTodolist(id);
    res.status(200).json(deletedToDolist);
  }

  async updateTodolist(req: Request, res: Response, next:NextFunction): Promise<void> {
    const { id } = req.params;
    const { title } = req.body;
    try {
      const updatedToDolist = await this.ToDoService.updateTodolist(id, title);
      res.status(200).json(updatedToDolist);
    } catch (e) {
      next(HTTPError.NoTitle());
    }
  }
}
