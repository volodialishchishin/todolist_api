"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = exports.Router = void 0;
const express_1 = require("express");
var express_2 = require("express");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return express_2.Router; } });
require("reflect-metadata");
class BaseController {
    constructor() {
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    bindRoutes(routes) {
        for (const route of routes) {
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map