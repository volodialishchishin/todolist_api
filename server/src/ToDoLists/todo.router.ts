import { NextFunction, Request, Response } from 'express'
import {BaseController} from "../common/base.controller";
import {ToDoService} from "./toDo.service";
import {todoRepository} from "./todo.repository";

export class TodoRouter extends BaseController  {
    constructor(
        private ToDoService: ToDoService
        ) {
        super();
        this.bindRoutes([
            { path: '/todolists', method: 'get', func: this.getTodoLists() },
            { path: '/todolists', method: 'post', func: this.createTodolist() },
            { path: '/todolists/:id', method: 'delete', func: this.deleteTodolist()},
            { path: '/todolists/:id', method: 'put', func: this.updateTodolist() },
            { path: '/todolists/:id/tasks', method: 'get', func: this.getTasks() },
            { path: '/todolists/:id/tasks/:taskid', method: 'delete', func: this.deleteTask()},
            { path: '/todolists/:id/tasks/:taskid', method: 'put', func: this.updateTask() },
            { path: '/todolists/:id/tasks', method: 'post', func: this.createTask() },
        ]);
    }

    getTodoLists() {
        return this.ToDoService.getTodolists()
    }

    createTodolist() {
        return this.ToDoService.createTodolist()
    }

    deleteTodolist() {
        return this.ToDoService.deleteTodolist()
    }

    updateTodolist() {
        return this.ToDoService.updateTodolist()
    }

    getTasks() {
        return this.ToDoService.getTasks()
    }

    deleteTask() {
        return  this.ToDoService.deleteTask()
    }

    createTask() {
        return this.ToDoService.createTask()
    }

    updateTask() {
        return this.ToDoService.updateTask()
    }
}




