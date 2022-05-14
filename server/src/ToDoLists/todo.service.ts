import { inject, injectable } from 'inversify';
import { QueryResult } from 'pg';
import { IToDoService } from './todo.service.interface';
import { TaskType, TodolistType } from '../interfaces/enties.interfaces';
import { TYPES } from '../Injection/types';
import { IToDoRepository } from './todo.repository.interface';

@injectable()
export class ToDoService implements IToDoService {
  constructor(@inject(TYPES.ToDoRepository) private ToDoRepository: IToDoRepository) {

  }

  async getTodolists(userId:string): Promise<QueryResult<TodolistType>> {
    return this.ToDoRepository.selectToDoLists(userId);
  }

  async createTodolist(title: string, userId: string): Promise<QueryResult<TodolistType>> {
    return this.ToDoRepository.InsertToDoList(title, userId);
  }

  async deleteTodolist(id: string): Promise<QueryResult<TodolistType>> {
    return this.ToDoRepository.deleteTodolist(id);
  }

  async updateTodolist(id: string, title: string): Promise<QueryResult<TodolistType>> {
    return this.ToDoRepository.updateTodolist(id, title);
  }

  async getTasks(id: string): Promise<QueryResult<TaskType>> {
    return this.ToDoRepository.selectTasks(id);
  }

  async deleteTask(id: string, taskid: string): Promise<QueryResult<TaskType>> {
    return this.ToDoRepository.deleteTask(id, taskid);
  }

  async createTask(title: string, id: string, status: number): Promise<QueryResult<TaskType>> {
    return this.ToDoRepository.insertTask(title, id, status);
  }

  async updateTask(title: string, status: string, id: string, taskid: string): Promise<QueryResult<TaskType>> {
    return this.ToDoRepository.updateTask(title, status, id, taskid);
  }
}
