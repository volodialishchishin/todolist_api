import { App } from './app'
import {TodoRouter} from "./ToDoLists/todo.router";
import {ToDoService} from "./ToDoLists/toDo.service";
import {todoRepository} from "./ToDoLists/todo.repository";

 function bootstrap() {

    const app = new App(
        new TodoRouter(new ToDoService(new todoRepository()),),
    );
     app.init();
}

bootstrap();
