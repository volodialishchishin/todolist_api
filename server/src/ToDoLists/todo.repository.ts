import { inject, injectable } from 'inversify';
import { QueryResult } from 'pg';
import { TodolistType } from '../Interfaces/enties.interfaces';
import { TYPES } from '../Injection/types';
import { DataBase } from '../Database/db';
import { IToDoRepository } from './Interfaces/todo.repository.interface';

@injectable()
export class ToDoRepository implements IToDoRepository {
  constructor(
    @inject(TYPES.DataBase) private db:DataBase,
  ) {
  }

  async insertToDoList(title: string, userId: string): Promise<QueryResult<TodolistType>> {
    return this.db.dbInit().query('INSERT INTO todolists(title,user_id) values($1,$2)  RETURNING * ', [title, userId]);
  }

  async selectToDoLists(userId: string): Promise<QueryResult<TodolistType>> {
    return this.db.dbInit().query('SELECT * FROM todolists where user_id = $1', [userId]);
  }

  async deleteToDolist(id: string, userId:string): Promise<QueryResult<TodolistType>> {
    return this.db.dbInit().query('DELETE FROM todolists WHERE id = $1 and user_id =$2 ; ', [id, userId]);
  }

  async updateToDolist(id: string, title: string, userId:string): Promise<QueryResult<TodolistType>> {
    return this.db.dbInit().query('UPDATE todolists SET title=$2 WHERE id = $1 and user_id = $3 RETURNING *', [id, title, userId]);
  }
}
