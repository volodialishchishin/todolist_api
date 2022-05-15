import { inject, injectable } from 'inversify';
import { IToDoService } from './todo.service.interface';
import { TodolistType } from '../Interfaces/enties.interfaces';
import { TYPES } from '../Injection/types';
import { IToDoRepository } from './todo.repository.interface';

@injectable()
export class ToDoService implements IToDoService {
  constructor(@inject(TYPES.ToDoRepository) private ToDoRepository: IToDoRepository) {

  }

  async getTodolists(userId:string): Promise<TodolistType[] | boolean> {
    const todolists = await this.ToDoRepository.selectToDoLists(userId);
    if (!todolists.rows.length) {
      return false;
    }
    return todolists.rows;
  }

  async createTodolist(title: string, userId: string): Promise<TodolistType | boolean> {
    const todolist = await this.ToDoRepository.InsertToDoList(title, userId);
    if (!title) {
      return false;
    }
    return todolist.rows[0];
  }

  async deleteTodolist(userId: string): Promise<TodolistType | boolean> {
    const todolist = await this.ToDoRepository.deleteTodolist(userId);
    return todolist.rows[0];
  }

  async updateTodolist(id: string, title: string): Promise<TodolistType | boolean> {
    const todolist = await this.ToDoRepository.updateTodolist(id, title);
    if (!title) {
      return false;
    }
    return todolist.rows[0];
  }
}
