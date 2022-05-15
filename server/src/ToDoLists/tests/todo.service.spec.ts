import 'reflect-metadata';
import { Container } from 'inversify';
import { IToDoRepository } from '../todo.repository.interface';
import { IToDoService } from '../todo.service.interface';
import { TYPES } from '../../Injection/types';
import { ToDoService } from '../todo.service';
import { TodolistType } from '../../Interfaces/enties.interfaces';

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

let todolist: TodolistType | boolean;

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
    todolist = await todoServ.createTodolist('Volodia', '1');
    if (typeof todolist !== 'boolean') {
      expect(todolist.title).toEqual('Volodia');
      expect(todolist.id).toEqual('2');
      expect(todolist.user_id).toEqual('1');
    }
  });
});
