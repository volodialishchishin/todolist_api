import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../Common/base.controller';
import { TYPES } from '../Injection/types';
import { HTTPError } from '../Errors/http-error.class';
import { IToDoController } from './Interfaces/todo.controller.interface';
import { IToDoService } from './Interfaces/todo.service.interface';

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
    const { context: { userId } } = req;
    try {
      const toDoLists = await this.ToDoService.getTodolists(userId);
      res.status(200).json(toDoLists);
    } catch (e) {
       next(HTTPError.NoTodo());
    }
  }

  async createTodolist(req: Request, res: Response, next:NextFunction): Promise<any> {
    const { title } = req.body;
    const { context: { userId } } = req;
    try {
      const newToDoList = await this.ToDoService.createTodolist(title, userId);
      res.status(201).json(newToDoList);
    } catch (e) {
       next(HTTPError.NoTitle());
    }
  }

  async deleteTodolist(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { context: { userId } } = req;
    const deletedToDolist = await this.ToDoService.deleteTodolist(id,userId);
    res.status(200).json(deletedToDolist);
  }

  async updateTodolist(req: Request, res: Response, next:NextFunction): Promise<void> {
    const { id } = req.params;
    const { title } = req.body;
    const { context: { userId } } = req;
    try {
      const updatedToDolist = await this.ToDoService.updateTodolist(id, title, userId);
      res.status(200).json(updatedToDolist);
    } catch (e) {
      next(HTTPError.NoTitle());
    }
  }
}
