"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPriorities = exports.TaskStatuses = exports.todolistsAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: 'https://localhost/',
});
exports.todolistsAPI = {
    getTodolists() {
        const promise = axios_1.default.get('http://localhost:8000/todolists');
        return promise;
    },
    createTodolist(title) {
        const promise = instance.post('todo-lists', { title: title });
        return promise;
    },
    deleteTodolist(id) {
        const promise = instance.delete(`todo-lists/${id}`);
        return promise;
    },
    updateTodolist(id, title) {
        const promise = instance.put(`todo-lists/${id}`, { title: title });
        return promise;
    },
    getTasks(todolistId) {
        return instance.get(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId, taskId) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId, taskTitile) {
        return instance.post(`todo-lists/${todolistId}/tasks`, { title: taskTitile });
    },
    updateTask(todolistId, taskId, model) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
};
var TaskStatuses;
(function (TaskStatuses) {
    TaskStatuses[TaskStatuses["New"] = 0] = "New";
    TaskStatuses[TaskStatuses["InProgress"] = 1] = "InProgress";
    TaskStatuses[TaskStatuses["Completed"] = 2] = "Completed";
    TaskStatuses[TaskStatuses["Draft"] = 3] = "Draft";
})(TaskStatuses = exports.TaskStatuses || (exports.TaskStatuses = {}));
var TaskPriorities;
(function (TaskPriorities) {
    TaskPriorities[TaskPriorities["Low"] = 0] = "Low";
    TaskPriorities[TaskPriorities["Middle"] = 1] = "Middle";
    TaskPriorities[TaskPriorities["Hi"] = 2] = "Hi";
    TaskPriorities[TaskPriorities["Urgently"] = 3] = "Urgently";
    TaskPriorities[TaskPriorities["Later"] = 4] = "Later";
})(TaskPriorities = exports.TaskPriorities || (exports.TaskPriorities = {}));
//# sourceMappingURL=todolists-api.js.map