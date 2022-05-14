import { QueryResult } from 'pg';
import { TaskType, TodolistType } from '../interfaces/enties.interfaces';

export class IToDoRepository {
  InsertToDoList: (title: string, userId: string) => Promise<QueryResult<TodolistType>>;

  selectToDoLists: (user_id: string) => Promise<QueryResult<TodolistType>>;

  deleteTodolist: (id: string) => Promise<QueryResult<TodolistType>>;

  updateTodolist: (id: string, title: string) => Promise<QueryResult<TodolistType>>;

  insertTask: (title: string, id: string, status: number) => Promise<QueryResult<TaskType>>;

  selectTasks: (id: string) => Promise<QueryResult<TaskType>>;

  updateTask: (title: string, status: string, id: string, taskid: string) => Promise<QueryResult<TaskType>>;

  deleteTask: (id: string, taskid: string) => Promise<QueryResult<TaskType>>;
}
