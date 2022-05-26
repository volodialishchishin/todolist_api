import { QueryResult } from 'pg';
import { TodolistType } from '../../Interfaces/enties.interfaces';

export class IToDoRepository {
  InsertToDoList: (title: string, userId: string) => Promise<QueryResult<TodolistType>>;

  selectToDoLists: (user_id: string) => Promise<QueryResult<TodolistType>>;

  deleteTodolist: (id: string) => Promise<QueryResult<TodolistType>>;

  updateTodolist: (id: string, title: string) => Promise<QueryResult<TodolistType>>;
}
