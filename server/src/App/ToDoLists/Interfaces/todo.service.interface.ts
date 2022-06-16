import { ToDoList } from '../../../Database/Enteties/ToDoList';
import {DeleteResult, UpdateResult} from "typeorm";

export interface IToDoService {

  getTodolists: (userId: string) => Promise<ToDoList[]>;

  createTodolist: (title: string, userId: string) => Promise<ToDoList>;

  deleteTodolist: (id: string, userId:string) => Promise<DeleteResult>;

  updateTodolist: (id: string, title: string, userId:string) => Promise<ToDoList>;

}
