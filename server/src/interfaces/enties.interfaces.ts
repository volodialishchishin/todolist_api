import {TaskStatuses} from "../../../client/src/api/todolists-api";

export interface TodolistType  {
    id: string
    title: string
    addedDate: string
    order: number
}
export interface TaskType {
    title: string
    status: TaskStatuses
    id: string
    todoListId: string
}
