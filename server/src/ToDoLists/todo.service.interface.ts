import { QueryResult } from 'pg';
import { TaskType, TodolistType } from '../interfaces/enties.interfaces';

export interface IToDoService {

  getTodolists: (userId: string) => Promise<QueryResult<TodolistType>>;

  createTodolist: (title: string, userId: string) => Promise<QueryResult<TodolistType>>;

  deleteTodolist: (id: string) => Promise<QueryResult<TodolistType>>;

  updateTodolist: (id: string, title: string) => Promise<QueryResult<TodolistType>>;

  getTasks: (id: string) => Promise<QueryResult<TaskType>>;

  deleteTask: (id: string, taskid: string) => Promise<QueryResult<TaskType>>;

  createTask: (title: string, id: string, status: number) => Promise<QueryResult<TaskType>>;

  updateTask: (title: string, status: string, id: string, taskid: string) => Promise<QueryResult<TaskType>>;
}
