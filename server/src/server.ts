import { App } from './app'
import {TodoRouter} from "./ToDoLists/todo.router";
import {ToDoService} from "./ToDoLists/toDo.service";

 function bootstrap() {

    const app = new App(
        new TodoRouter(new ToDoService()),
    );
     app.init();
}

bootstrap();
