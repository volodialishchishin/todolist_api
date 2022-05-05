export interface TodolistType  {
    id: string
    title: string
    addedDate: string
    order: number
}
export interface TaskType {
    title: string
    status: number
    id: string
    todoListId: string
}
