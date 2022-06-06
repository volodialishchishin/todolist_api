import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '../../../Injection/types';
import { ToDoService } from '../todo.service';
import { TodolistType } from '../../../Interfaces/enties.interfaces';
import { IToDoRepository } from '../Interfaces/todo.repository.interface';
import { IToDoService } from '../Interfaces/todo.service.interface';

const todoRepositoryMock: IToDoRepository = {
  selectToDoLists: jest.fn(),
  InsertToDoList: jest.fn(),
  updateTodolist: jest.fn(),
  deleteTodolist: jest.fn(),
};

const container = new Container();
let todoRep: IToDoRepository;
let todoServ: IToDoService;

beforeAll(() => {
  container.bind<IToDoService>(TYPES.ToDoService).to(ToDoService);
  container.bind<IToDoRepository>(TYPES.ToDoRepository).toConstantValue(todoRepositoryMock);

  todoRep = container.get<IToDoRepository>(TYPES.ToDoRepository);
  todoServ = container.get<IToDoService>(TYPES.ToDoService);
});

let toDoList: TodolistType;
let toDoLists: TodolistType[];

describe('Todo Service', () => {
  it('createTodo Valid', async () => {
    todoRep.InsertToDoList = jest.fn().mockImplementationOnce(
      (title:string, userID:string): { rows: { id: string, title: string, user_id:string }[] } => (
        {
          rows: [
            {
              title,
              user_id: userID,
              id: '2',
            },
          ],
        }
      ),
    );
    toDoList = await todoServ.createTodolist('Volodia', '1');
    expect(toDoList.title).toEqual('Volodia');
    expect(toDoList.id).toEqual('2');
    expect(toDoList.user_id).toEqual('1');
  });

  it('createTodo invalid', async () => {
    todoRep.InsertToDoList = jest.fn().mockImplementationOnce(
      (title:string, userID:string): { rows: { id: string, title: string, user_id:string }[] } => (
        {
          rows: [
            {
              title,
              user_id: userID,
              id: '2',
            },
          ],
        }
      ),
    );
    await expect(async () => todoServ.createTodolist('', '1')).rejects.toThrowError();
  });

  it('Get todo valid', async () => {
    todoRep.selectToDoLists = jest.fn().mockImplementationOnce(
      (userID:string): { rows: { id: string, title: string, user_id:string }[] } => (
        {
          rows: [
            {
              title: 'fsdfsdf',
              user_id: userID,
              id: '2',
            },
          ],
        }
      ),
    );
    toDoLists = await todoServ.getTodolists('1');
    expect(toDoLists.length).toEqual(1);
  });

  it('Get todo  invalid', async () => {
    todoRep.selectToDoLists = jest.fn().mockImplementationOnce(
      (): { rows: { id: string, title: string, user_id:string }[] } => (
        {
          rows: [
          ],
        }
      ),
    );
    toDoLists = await todoServ.getTodolists('1');
    expect(toDoLists.length).toEqual(1);
  });

  it('delete todo', async () => {
    todoRep.deleteTodolist = jest.fn().mockImplementationOnce(
      (): { rows: { id: string, title: string, user_id:string }[] } => (
        {
          rows: [
          ],
        }
      ),
    );
    toDoLists = await todoServ.deleteTodolist('1');
    expect(toDoLists.length).toEqual(0);
  });

  it('update todo', async () => {
    todoRep.updateTodolist = jest.fn().mockImplementationOnce(
      (id:string, title:string): { rows: { id: string, title: string, user_id:string }[] } => (
        {
          rows: [
            {
              title,
              user_id: '1',
              id,
            },
          ],
        }
      ),
    );
    toDoList = await todoServ.updateTodolist('1', 'zdarova');
    expect(toDoList.title).toEqual('zdarova');
    expect(toDoList.title).toEqual('1');
  });
});
