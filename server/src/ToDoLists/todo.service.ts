import { inject, injectable } from 'inversify';
import { TodolistType } from '../Interfaces/enties.interfaces';
import { TYPES } from '../Injection/types';
import { IToDoRepository } from './interfaces/todo.repository.interface';
import { IToDoService } from './interfaces/todo.service.interface';

@injectable()
export class ToDoService implements IToDoService {
  constructor(@inject(TYPES.ToDoRepository) private ToDoRepository: IToDoRepository) {

  }

  async getTodolists(userId:string): Promise<TodolistType[]> {
    const todolists = await this.ToDoRepository.selectToDoLists(userId);
    if (!todolists.rows.length) {
      throw new Error();
    }
    return todolists.rows;
  }

  async createTodolist(title: string, userId: string): Promise<TodolistType> {
    if (!title) {
      throw new Error();
    }
    const todolist = await this.ToDoRepository.InsertToDoList(title, userId);
    return todolist.rows[0];
  }

  async deleteTodolist(id: string, userId:string): Promise<TodolistType[]> {
    const todolist = await this.ToDoRepository.deleteTodolist(id, userId);
    return todolist.rows;
  }

  async updateTodolist(id: string, title: string,userId:string): Promise<TodolistType> {
    if (!title) {
      throw new Error();
    }
    const todolist = await this.ToDoRepository.updateTodolist(id, title, userId);
    return todolist.rows[0];
  }
}
