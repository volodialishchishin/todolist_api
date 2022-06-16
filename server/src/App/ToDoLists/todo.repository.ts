import { injectable } from 'inversify';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IToDoRepository } from './Interfaces/todo.repository.interface';
import { ToDoList } from '../../Database/Enteties/ToDoList';

@injectable()
export class ToDoRepository implements IToDoRepository {
  async insertToDoList(title: string, userId: string): Promise<ToDoList> {
    const todolist = ToDoList.create({
      title,
      user: {
        id: Number(userId),
      },
    });
    await todolist.save();

    return todolist;
  }

  async selectToDoLists(userId: string):Promise<ToDoList[]> {
    return ToDoList.find({
      where: {
        user: {
          id: Number(userId),
        },
      },
    });
  }

  async deleteToDolist(id: string, userId:string): Promise<DeleteResult> {
    return ToDoList.delete(
      {
        id: Number(id),
        user: {
          id: Number(userId),
        },
      },
    );
  }

  async updateToDolist(id: string, title: string, userId:string): Promise<ToDoList> {
    const result = await ToDoList.createQueryBuilder().update({
      title,
    }).where(
      {
        id: Number(id),
        user: {
          id: Number(userId),
        },
      },
    ).returning('*')
      .execute();
    return result.raw[0];
  }
}
