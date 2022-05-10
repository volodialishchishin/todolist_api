import { BaseController } from '../common/base.controller';
import { ToDoService } from './todo.service';
import { Request, Response } from 'express';
import { ItodoController } from './todo.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';

@injectable()
export class TodoController extends BaseController implements ItodoController {
	constructor(
		@inject(TYPES.ToDoService) private ToDoService: ToDoService) {
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
		const { id } = req.body;
		const todolists = await this.ToDoService.getTodolists(id);
		res.json(todolists.rows);
	}

	async createTodolist(req: Request, res: Response): Promise<void> {
		const { title, user_id } = req.body;
		const newtodolist = await this.ToDoService.createTodolist(title, user_id);
		res.json(newtodolist.rows[0]);
	}

	async deleteTodolist(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		const deletedToDolist = await this.ToDoService.deleteTodolist(id);
		res.json(deletedToDolist);
	}

	async updateTodolist(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		const { title } = req.body;
		const updatedToDolist = await this.ToDoService.updateTodolist(id, title);
		res.json(updatedToDolist);
	}

	async getTasks(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		const newTask = await this.ToDoService.getTasks(id);
		res.json(newTask.rows);
	}

	async deleteTask(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		const taskid = req.params.taskid;
		const newTask = await this.ToDoService.deleteTask(id, taskid);
		res.json(newTask.rows);
	}

	async createTask(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		const status = 0;
		const { title } = req.body;
		const newTask = await this.ToDoService.createTask(title, id, status);
		res.json(newTask.rows[0]);
	}

	async updateTask(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		const taskid = req.params.taskid;
		const { title, status } = req.body;
		const updatedTask = await this.ToDoService.updateTask(title, status, id, taskid);
		res.json(updatedTask.rows);
	}
}


