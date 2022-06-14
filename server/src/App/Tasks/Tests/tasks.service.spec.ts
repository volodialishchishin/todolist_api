import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '../../../Injection/types';
import { TasksService } from '../tasks.service';
import { TaskType } from '../../../Interfaces/enties.interfaces';
import { ITasksRepository } from '../Interfaces/tasks.repository.interface';
import { ITasksService } from '../Interfaces/tasks.service.interface';

const tasksRepositoryMock: ITasksRepository = {
  selectTasks: jest.fn(),
  insertTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
};

const container = new Container();
let tasksRep: ITasksRepository;
let tasksServ: ITasksService;

beforeAll(() => {
  container.bind<ITasksService>(TYPES.TasksService).to(TasksService);
  container.bind<ITasksRepository>(TYPES.TasksRepository).toConstantValue(tasksRepositoryMock);

  tasksRep = container.get<ITasksRepository>(TYPES.TasksRepository);
  tasksServ = container.get<ITasksService>(TYPES.TasksService);
});

let task: TaskType;
let tasks: TaskType[];

describe('Task Service', () => {
  it('create task Valid', async () => {
    tasksRep.insertTask = jest.fn().mockImplementationOnce(
      (title:string, id:string, status:number): { rows: { id: string, title: string, todoListId:string, status:number }[] } => (
        {
          rows: [
            {
              title,
              status,
              id,
              todoListId: '3',
            },
          ],
        }
      ),
    );
    await expect(async () => tasksServ.createTask('', '2', 0)).rejects.toThrowError();
    task = await tasksServ.createTask('Volodia', '2', 0);
    expect(task.title).toEqual('Volodia');
    expect(task.id).toEqual('2');
    expect(task.todoListId).toEqual('3');
    expect(task.status).toEqual(0);
  });

  it('create task invalid', async () => {
    tasksRep.insertTask = jest.fn().mockImplementationOnce(
      (title:string, id:string, status:number): { rows: { id: string, title: string, todoListId:string, status:number }[] } => (
        {
          rows: [
            {
              title,
              status,
              id,
              todoListId: '3',
            },
          ],
        }
      ),
    );
    await expect(async () => tasksServ.createTask('', '2', 0)).rejects.toThrowError();
  });

  it('get task valid', async () => {
    tasksRep.selectTasks = jest.fn().mockImplementationOnce(
      (id:string): { rows: { id: string, title: string, todoListId:string, status:number }[] } => (
        {
          rows: [
            {
              title: 'fsdfsf',
              status: 0,
              id,
              todoListId: '3',
            },
            {
              title: 'fsdfsf',
              status: 0,
              id,
              todoListId: '3',
            },
          ],
        }
      ),
    );
    tasks = await tasksServ.getTasks('3');
    expect(tasks.length).toEqual(2);
  });

  it('get task invalid', async () => {
    tasksRep.selectTasks = jest.fn().mockImplementationOnce(
      (): { rows: { id: string, title: string, todoListId:string, status:number }[] } => (
        {
          rows: [
          ],
        }
      ),
    );
    await expect(async () => tasksServ.getTasks('1')).rejects.toThrowError();
  });
});
