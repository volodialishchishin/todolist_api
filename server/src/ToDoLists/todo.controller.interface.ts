import {Request, Response} from 'express';

export interface ItodoController {
    getTodoLists: (req: Request, res: Response) => void

    createTodolist: (req: Request, res: Response) => void

    deleteTodolist: (req: Request, res: Response) => void

    updateTodolist: (req: Request, res: Response) => void

    getTasks: (req: Request, res: Response) => void

    deleteTask: (req: Request, res: Response) => void

    createTask: (req: Request, res: Response) => void

    updateTask: (req: Request, res: Response) => void

}



