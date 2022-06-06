import { TodolistType } from '../../Interfaces/enties.interfaces';

export interface IToDoService {

  getTodolists: (userId: string) => Promise<TodolistType[]>;

  createTodolist: (title: string, userId: string) => Promise<TodolistType>;

  deleteTodolist: (id: string, userId:string) => Promise<TodolistType[]>;

  updateTodolist: (id: string, title: string, userId:string) => Promise<TodolistType>;

}