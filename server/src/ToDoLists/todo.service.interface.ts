import { TodolistType } from '../Interfaces/enties.interfaces';

export interface IToDoService {

  getTodolists: (userId: string) => Promise<TodolistType[] | boolean>;

  createTodolist: (title: string, userId: string) => Promise<TodolistType | boolean>;

  deleteTodolist: (id: string) => Promise<TodolistType | boolean>;

  updateTodolist: (id: string, title: string) => Promise<TodolistType | boolean>;

}
