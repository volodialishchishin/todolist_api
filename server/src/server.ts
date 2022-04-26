import { App } from './app'
import {TodoRouter} from "./ToDoLists/todo.router.js";
import {ToDoService} from "./ToDoLists/toDo.service.js";
import {NextFunction, Request, Response} from "express";

 function bootstrap() {

    const app = new App(
        new TodoRouter(new ToDoService()),
    );
     app.init();
}

bootstrap();
