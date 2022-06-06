import { QueryResult } from 'pg';
import { TodolistType } from '../../../Interfaces/enties.interfaces';

export class IToDoRepository {
  insertToDoList: (title: string, userId: string) => Promise<QueryResult<TodolistType>>;

  selectToDoLists: (user_id: string) => Promise<QueryResult<TodolistType>>;

  deleteToDolist: (id: string, userId:string) => Promise<QueryResult<TodolistType>>;

  updateToDolist: (id: string, title: string, userId:string) => Promise<QueryResult<TodolistType>>;
}
