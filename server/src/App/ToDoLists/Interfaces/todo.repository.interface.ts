import { DeleteResult, UpdateResult } from 'typeorm';
import { ToDoList } from '../../../Database/Enteties/ToDoList';

export class IToDoRepository {
  insertToDoList: (title: string, userId: string) => Promise<ToDoList>;

  selectToDoLists: (userId: string) => Promise<ToDoList[]>;

  deleteToDolist: (id: string, userId:string) => Promise<DeleteResult>;

  updateToDolist: (id: string, title: string, userId:string) => Promise<ToDoList>;
}
