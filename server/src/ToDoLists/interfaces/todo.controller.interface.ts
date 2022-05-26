import {NextFunction, Request, Response} from 'express';

export interface IToDoController {
  getTodoLists: (req: Request, res: Response, next: NextFunction) => void

  createTodolist: (req: Request, res: Response, next:NextFunction) => void

  deleteTodolist: (req: Request, res: Response) => void

  updateTodolist: (req: Request, res: Response,next:NextFunction) => void

}
