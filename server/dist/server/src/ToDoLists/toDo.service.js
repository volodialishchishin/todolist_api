"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoService = void 0;
const todo_repository_js_1 = require("./todo.repository.js");
class ToDoService {
    constructor() {
        this._data = todo_repository_js_1.data;
    }
    getTodolists() {
        return this._data;
    }
    createTodolist(title) {
    }
    deleteTodolist(id) {
    }
    updateTodolist(id, title) {
    }
    getTasks(todolistId) {
    }
    deleteTask(todolistId, taskId) {
    }
    createTask(todolistId, taskTitile) {
    }
    updateTask(todolistId, taskId, model) {
    }
}
exports.ToDoService = ToDoService;
//# sourceMappingURL=toDo.service.js.map