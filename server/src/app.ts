import express, {Express, NextFunction, Request, Response} from 'express';
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
        this.app.use(cors())
        this.port = 8000;
    }

    useCors():void{
       this.app.use(cors())
    }

    useRoutes(): void {
        this.app.use('/', this.TodoRouter.router);
    }


    init() {
        this.app.use(cors())
        this.useRoutes();
        this.server = this.app.listen(this.port);
        console.log('Server listening' + this.port)
    }
}
