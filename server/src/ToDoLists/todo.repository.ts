import { ItodoRepository } from './todo.repository.interface';
import { injectable } from 'inversify';
import db from '../db';
import { TaskType, TodolistType } from '../interfaces/enties.interfaces';
import { QueryResult } from 'pg';

@injectable()
export class ToDoRepository implements ItodoRepository {
	async InsertToDoList(title: string, userId: string): Promise<QueryResult<TodolistType>> {
		return db.query('INSERT INTO todolists(title,user_id) values($1,$2) RETURNING * ', [title, userId]);
	}

	async selectToDoLists(userId: string): Promise<QueryResult<TodolistType>> {
		return db.query('SELECT * FROM todolists where user_id = $1', [userId]);
	}

	async deleteTodolist(id: string): Promise<QueryResult<TodolistType>> {
		return db.query('DELETE FROM todolists WHERE id = $1; ', [id]);
	}

	async updateTodolist(id: string, title: string): Promise<QueryResult<TodolistType>> {
		return db.query('UPDATE todolists SET title=$2 WHERE id = $1 RETURNING *', [id, title]);
	}

	async insertTask(title: string, id: string, status: number): Promise<QueryResult<TaskType>> {
		return db.query('INSERT INTO tasks(title,todolistid,status) values($1,$2,$3) RETURNING * ', [title, id, status]);
	}

	async selectTasks(id: string): Promise<QueryResult<TaskType>> {
		return db.query('SELECT * FROM tasks where todolistid = $1', [id]);
	}

	async updateTask(title: string, status: string, id: string, taskid: string): Promise<QueryResult<TaskType>> {
		return db.query('UPDATE tasks SET title=$1 , status = $2   where todolistid = $3 and id = $4 RETURNING *', [title, status, id, taskid]);
	}

	async deleteTask(id: string, taskid: string): Promise<QueryResult<TaskType>> {
		return db.query('DELETE  FROM tasks where todolistid = $1 and id = $2', [id, taskid]);
	}
}


