import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IToDoService } from './todo.service.interface';
import { IToDoController } from './todo.controller.interface';
import { TYPES } from '../Injection/types';

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
      { path: '/todolists/:id/tasks', method: 'get', func: this.getTasks },
      { path: '/todolists/:id/tasks/:taskid', method: 'delete', func: this.deleteTask },
      { path: '/todolists/:id/tasks/:taskid', method: 'put', func: this.updateTask },
      { path: '/todolists/:id/tasks', method: 'post', func: this.createTask },
    ]);
  }

  async getTodoLists(req: Request, res: Response): Promise<void> {
    console.log(req.context);
    const { context: { id } } = req;
    console.log(id);
    const todolists = await this.ToDoService.getTodolists(id);
    res.json(todolists.rows);
  }

  async createTodolist(req: Request, res: Response): Promise<void> {
    const { title, userId } = req.body;
    const newtodolist = await this.ToDoService.createTodolist(title, userId);
    res.json(newtodolist.rows[0]);
  }

  async deleteTodolist(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const deletedToDolist = await this.ToDoService.deleteTodolist(id);
    res.json(deletedToDolist);
  }

  async updateTodolist(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title } = req.body;
    const updatedToDolist = await this.ToDoService.updateTodolist(id, title);
    res.json(updatedToDolist);
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const newTask = await this.ToDoService.getTasks(id);
    res.json(newTask.rows);
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { taskid } = req.params;
    const newTask = await this.ToDoService.deleteTask(id, taskid);
    res.json(newTask.rows);
  }

  async createTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const status = 0;
    const { title } = req.body;
    const newTask = await this.ToDoService.createTask(title, id, status);
    res.json(newTask.rows[0]);
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { taskid } = req.params;
    const { title, status } = req.body;
    const updatedTask = await this.ToDoService.updateTask(title, status, id, taskid);
    res.json(updatedTask.rows);
  }
}
