import {TodolistType} from "../interfaces/enties.interfaces";
import {data} from './todo.repository'
import {ResponseType, TaskType, UpdateTaskModelType} from "../../../client/src/api/todolists-api";

export  class ToDoService  {
    _data:Array<TodolistType>
    constructor() {
        this._data = data
    }
    getTodolists(): Array<TodolistType> {
        return this._data;
    }
    createTodolist(title: string) {
    }

    deleteTodolist(id: string) {
    }
    updateTodolist(id: string, title: string) {
    }

    getTasks(todolistId: string) {
    }

    deleteTask(todolistId: string, taskId: string) {
    }

    createTask(todolistId: string, taskTitile: string) {
    }

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    }
}
