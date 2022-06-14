import { inject, injectable } from 'inversify';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TYPES } from '../../Injection/types';
import { IToDoRepository } from './Interfaces/todo.repository.interface';
import { IToDoService } from './Interfaces/todo.service.interface';
import { ToDoList } from '../../Database/Enteties/ToDoList';

@injectable()
export class ToDoService implements IToDoService {
  constructor(@inject(TYPES.ToDoRepository) private ToDoRepository: IToDoRepository) {

  }

  async getTodolists(userId:string): Promise<ToDoList[]> {
    const todolists = await this.ToDoRepository.selectToDoLists(userId);
    if (!todolists) {
      throw new Error();
    }
    return todolists;
  }

  async createTodolist(title: string, userId: string): Promise<ToDoList> {
    if (!title) {
      throw new Error();
    }
    const todolist = await this.ToDoRepository.insertToDoList(title, userId);
    if (!todolist) {
      throw new Error();
    } else {
      return todolist;
    }
  }

  async deleteTodolist(id: string, userId:string): Promise<DeleteResult> {
    const todolist = await this.ToDoRepository.deleteToDolist(id, userId);
    return todolist;
  }

  async updateTodolist(id: string, title: string, userId:string): Promise<UpdateResult> {
    if (!title) {
      throw new Error();
    }
    const todolist = await this.ToDoRepository.updateToDolist(id, title, userId);
    return todolist;
  }
}
