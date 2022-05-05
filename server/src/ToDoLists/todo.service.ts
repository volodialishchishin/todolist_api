import {ToDoRepository} from './todo.repository';
import {IToDoService} from './todo.service.interface';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
@injectable()
export class ToDoService implements IToDoService {
	constructor(@inject(TYPES.ToDoRepository) private ToDoRepository: ToDoRepository) {

	}
	async getTodolists(): Promise<any> {
		return this.ToDoRepository.selectToDoLists();
	}

	async createTodolist(title:string): Promise<any> {
		return await this.ToDoRepository.InsertToDoList(title);
	}

	async deleteTodolist(id:string) : Promise<any> {
		return await this.ToDoRepository.deleteTodolist(id);
	}

	async updateTodolist(id:string, title:string): Promise<any> {
		return await this.ToDoRepository.updateTodolist(id, title);
	}

	async getTasks(id:string) : Promise<any> {
		return await this.ToDoRepository.selectTasks(id);
	}

	async deleteTask(id:string, taskid:string) :Promise<any> {
		return await this.ToDoRepository.deleteTask(id, taskid);
	}

	async createTask(title:string, id:string, status:number) :Promise<any> {
		return await this.ToDoRepository.insertTask(title, id, status);
	}

	async updateTask(title:string, status:string, id:string, taskid:string) :Promise<any> {
		return await this.ToDoRepository.updateTask(title, status, id, taskid);
	}
}
