import express, {Express} from 'express';
import {Server} from 'http';
import {TodoRouter} from "./ToDoLists/todo.router.js";
import cors from 'cors'
export class App  {
    app: Express;
    server: Server;
    port: number;

    constructor(private TodoRouter: TodoRouter
    ) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes(): void {
        this.app.use('/', this.TodoRouter.router);
    }

    useJson():void{
        this.app.use(express.json())
    }

    useCors() : void{
        this.app.use(cors())
    }

    init() {
        this.useJson()
        this.useCors()
        this.useRoutes();
        this.server = this.app.listen(this.port);
        console.log('Server listening' + this.port)
    }
}
