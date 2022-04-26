"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRouter = void 0;
const base_controller_js_1 = require("../common/base.controller.js");
class TodoRouter extends base_controller_js_1.BaseController {
    constructor(ToDoService) {
        super();
        this.ToDoService = ToDoService;
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
    getTodoLists(req, res, next) {
        res.send(this.ToDoService.getTodolists());
    }
    createTodolist(req, res, next) {
        res.send(this.ToDoService.getTodolists());
    }
    deleteTodolist(req, res, next) {
        res.send(this.ToDoService.getTodolists());
    }
    updateTodolist(req, res, next) {
        res.send(this.ToDoService.getTodolists());
    }
    getTasks(req, res, next) {
        res.send(this.ToDoService.getTodolists());
    }
    deleteTask(req, res, next) {
        res.send(this.ToDoService.getTodolists());
    }
    createTask(req, res, next) {
        res.send(this.ToDoService.getTodolists());
    }
    updateTask(req, res, next) {
        res.send(this.ToDoService.getTodolists());
    }
}
exports.TodoRouter = TodoRouter;
//# sourceMappingURL=todo.router.js.map