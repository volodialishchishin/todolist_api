import { NextFunction, Request, Response } from 'express'
import {BaseController} from "../common/base.controller.js";
import {ToDoService} from "./toDo.service";

export class TodoRouter extends BaseController  {
    constructor(
        private ToDoService: ToDoService) {
        super();
        this.bindRoutes([
            { path: '/todolists', method: 'get', func: this.getTodoLists },
            { path: '/todolists', method: 'post', func: this.createTodolist },
            { path: '/todolists/:id', method: 'delete', func: this.deleteTodolist },
            { path: '/todolists/:id', method: 'put', func: this.getTodoLists },
            { path: '/todolists/:id/tasks', method: 'get', func: this.getTasks },
            { path: '/todolists/:id/tasks/:id', method: 'delete', func: this.deleteTask },
            { path: '/todolists/:id/tasks/:id', method: 'put', func: this.updateTask },
            { path: '/todolists/:id/tasks', method: 'post', func: this.createTask },
        ]);
    }

    getTodoLists(req: Request, res: Response, next: NextFunction): void {
        res.send(this.ToDoService.getTodolists())
    }

    createTodolist(req: Request, res: Response, next: NextFunction): void {
        res.send(this.ToDoService.getTodolists())
    }
    deleteTodolist(req: Request, res: Response, next: NextFunction): void {
        res.send(this.ToDoService.getTodolists())
    }
    updateTodolist(req: Request, res: Response, next: NextFunction): void {
        res.send(this.ToDoService.getTodolists())
    }
    getTasks(req: Request, res: Response, next: NextFunction): void {
        res.send(this.ToDoService.getTodolists())
    }
    deleteTask(req: Request, res: Response, next: NextFunction): void {
        res.send(this.ToDoService.getTodolists())
    }

    createTask(req: Request, res: Response, next: NextFunction): void {
        res.send(this.ToDoService.getTodolists())
    }

    updateTask(req: Request, res: Response, next: NextFunction): void {
        res.send(this.ToDoService.getTodolists())
    }
}




