import { inject, injectable } from 'inversify';
import { QueryResult } from 'pg';
import { IToDoRepository } from './todo.repository.interface';
import { TodolistType } from '../Interfaces/enties.interfaces';
import { TYPES } from '../Injection/types';
import { DataBase } from '../database/db';

@injectable()
export class ToDoRepository implements IToDoRepository {
  constructor(
    @inject(TYPES.DataBase) private db:DataBase,
  ) {
  }

  async InsertToDoList(title: string, userId: string): Promise<any> {
    return this.db.dbInit().query('INSERT INTO todolists(title,user_id) values($1,$2) RETURNING * ', [title, userId]);
  }

  async selectToDoLists(userId: string): Promise<QueryResult<TodolistType>> {
    return this.db.dbInit().query('SELECT * FROM todolists where user_id = $1', [userId]);
  }

  async deleteTodolist(id: string): Promise<QueryResult<TodolistType>> {
    return this.db.dbInit().query('DELETE FROM todolists WHERE id = $1; ', [id]);
  }

  async updateTodolist(id: string, title: string): Promise<QueryResult<TodolistType>> {
    return this.db.dbInit().query('UPDATE todolists SET title=$2 WHERE id = $1 RETURNING *', [id, title]);
  }
}
