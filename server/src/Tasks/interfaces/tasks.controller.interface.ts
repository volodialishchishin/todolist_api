import { NextFunction, Request, Response } from 'express';

export interface ITasksController {
  getTasks: (req: Request, res: Response, next:NextFunction) => void

  deleteTask: (req: Request, res: Response) => void

  createTask: (req: Request, res: Response, next:NextFunction) => void

  updateTask: (req: Request, res: Response, next:NextFunction) => void

}
