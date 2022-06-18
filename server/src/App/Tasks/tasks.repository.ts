import {  injectable } from 'inversify';
import { DeleteResult } from 'typeorm';
import { ITasksRepository } from './Interfaces/tasks.repository.interface';
import { db } from '../../Database/db';
import { Task } from '../../Database/Enteties/Task';

@injectable()
export class TasksRepository implements ITasksRepository {

  async insertTask(title: string, id: string, status: number, userId:string): Promise<Task> {
    const todolist = Task.create({
      title,
      user: {
        id: Number(userId),
      },
      todolist: {
        id: Number(id),
      },
      status,
    });
    await todolist.save();
    return todolist;
  }

  async selectTasks(id: string, userId: string): Promise<Task[]> {
    return Task.find({
      where: {
        user: {
          id: Number(userId),
        },
        todolist: {
          id: Number(id),
        },
      },
    });
  }

  async updateTask(title: string, status: number, id: string, taskid: string, userId:string): Promise<Task> {
    const result = await Task.createQueryBuilder().update({
      title,
      status,
    }).where({
      id: Number(taskid),
      user: {
        id: Number(userId),
      },
    }).returning('*')
      .execute();
    return result.raw[0];
  }

  async deleteTask(id: string, taskid: string, userId:string): Promise<DeleteResult> {
    const result = await Task.delete(
      {
        id: Number(taskid),
        user: {
          id: Number(userId),
        },
        todolist: {
          id: Number(id),
        },
      },
    )
    return result;
  }
}
