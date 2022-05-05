export  interface IToDoService {

    getTodolists:()=> Promise<any>

    createTodolist:(title:string) => Promise<any>

    deleteTodolist:(id:string)  => Promise<any>

    updateTodolist:(id:string,title:string)  => Promise<any>

    getTasks:(id:string) => Promise<any>

    deleteTask:(id:string,taskid:string) => Promise<any>

    createTask:(title:string,id:string,status:number) => Promise<any>

    updateTask:(title:string,status:string,id:string,taskid:string) => Promise<any>
}
