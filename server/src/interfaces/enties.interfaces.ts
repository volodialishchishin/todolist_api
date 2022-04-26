export interface TodolistType  {
    id: string
    title: string
    addedDate: string
    order: number
}
export interface TaskType {
    description: string
    title: string
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: string
}
