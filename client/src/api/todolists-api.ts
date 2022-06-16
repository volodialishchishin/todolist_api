import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        get: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.NQ.ryxZsIktvrt1HVZ7DS_CSan1-wGavDcGHBisc645zfU'
        },
        post: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.NQ.ryxZsIktvrt1HVZ7DS_CSan1-wGavDcGHBisc645zfU'
        },
        delete: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.NQ.ryxZsIktvrt1HVZ7DS_CSan1-wGavDcGHBisc645zfU'
        },
        put: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.NQ.ryxZsIktvrt1HVZ7DS_CSan1-wGavDcGHBisc645zfU'
        }
    }
})

export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<TodolistType[]>('todolists')
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('todolists', {title: title})

        return promise;
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType>(`todolists/${id}`);
        return promise;
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<ResponseType>(`todolists/${id}`, {title: title});
        return promise;
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todolists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todolists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, taskTitile: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todolists/${todolistId}/tasks`, {title: taskTitile});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todolists/${todolistId}/tasks/${taskId}`, model);
    }
}

export type TodolistType = {
    id: string
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    title: string
    status: TaskStatuses
    id: string
    todolist: {
        id: number
    }
}
export type UpdateTaskModelType = {
    title: string
    status: TaskStatuses
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
