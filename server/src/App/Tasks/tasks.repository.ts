import { inject, injectable } from 'inversify';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ITasksRepository } from './Interfaces/tasks.repository.interface';
import { TYPES } from '../../Injection/types';
import { DataBase } from '../../Database/db';
import { Task } from '../../Database/Enteties/Task';

@injectable()
export class TasksRepository implements ITasksRepository {
  constructor(
    @inject(TYPES.DataBase) private db:DataBase,
  ) {
  }

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

  async updateTask(title: string, status: number, id: string, taskid: string, userId:string): Promise<UpdateResult> {
    return Task.update(
      {
        title,
        status,
      },
      {
        id: Number(id),
        user: {
          id: Number(userId),
        },
      },
    );
  }

  async deleteTask(id: string, taskid: string, userId:string): Promise<DeleteResult> {
    return Task.delete(
      {
        id: Number(id),
        user: {
          id: Number(userId),
        },
        todolist: {
          id: Number(taskid),
        },
      },
    );
  }
}
