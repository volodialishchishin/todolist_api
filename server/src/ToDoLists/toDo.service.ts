import {todoRepository} from "./todo.repository";

export  class ToDoService  {

    constructor(private todoRepository:todoRepository) {

    }
    getTodolists()  {
       return this.todoRepository.selectToDoLists
    }

    createTodolist() {
        return this.todoRepository.InsertToDoList
    }

    deleteTodolist() {
        return this.todoRepository.deleteTodolist
    }

    updateTodolist() {
        return this.todoRepository.updateTodolist

    }

    getTasks() {
        return this.todoRepository.selectTasks
    }

    deleteTask() {
        return this.todoRepository.deleteTask
    }

    createTask() {
        return this.todoRepository.insertTask
    }

    updateTask() {
        return this.todoRepository.updateTask
    }
}
