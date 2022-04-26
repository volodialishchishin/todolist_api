"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const todo_router_js_1 = require("./ToDoLists/todo.router.js");
const toDo_service_js_1 = require("./ToDoLists/toDo.service.js");
function bootstrap() {
    const app = new app_1.App(new todo_router_js_1.TodoRouter(new toDo_service_js_1.ToDoService()));
    app.init();
}
bootstrap();
//# sourceMappingURL=server.js.map