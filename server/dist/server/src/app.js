"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor(TodoRouter) {
        this.TodoRouter = TodoRouter;
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.port = 8000;
    }
    useCors() {
        this.app.use((0, cors_1.default)());
    }
    useRoutes() {
        this.app.use('/', this.TodoRouter.router);
    }
    init() {
        this.app.use((0, cors_1.default)());
        this.useRoutes();
        this.server = this.app.listen(this.port);
        console.log('Server listening' + this.port);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map