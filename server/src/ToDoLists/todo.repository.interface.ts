export class ItodoRepository {
	InsertToDoList:(title:string) => Promise<any>;

	selectToDoLists:()=> Promise<any>;

	deleteTodolist:(id:string)=> Promise<any>;

	updateTodolist:(id:string, title:string) => Promise<any>;

	insertTask:(title:string, id:string, status:number) => Promise<any>;

	selectTasks: (id:string) => Promise<any>;

	updateTask:(title:string, status:string, id:string, taskid:string) => Promise<any>;

	deleteTask:(id:string, taskid:string) => Promise<any>;
}


