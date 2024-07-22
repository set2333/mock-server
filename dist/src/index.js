"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockServer = void 0;
const http_1 = __importDefault(require("http"));
const consts_1 = require("./consts");
const Routes_1 = __importDefault(require("./Routes"));
class MockServer {
    constructor(options) {
        this.options = Object.assign(consts_1.defaultOptions, options);
        this.roures = new Routes_1.default();
        this.server = http_1.default.createServer(this.roures.resolve.bind(this.roures));
    }
    add(method, path, handler) {
        //@ts-ignore-next-line
        this.roures[method][path] = handler;
        return this;
    }
    get(path, handler) {
        return this.add('GET', path, handler);
    }
    post(path, handler) {
        return this.add('POST', path, handler);
    }
    put(path, handler) {
        return this.add('PUT', path, handler);
    }
    delete(path, handler) {
        return this.add('DELETE', path, handler);
    }
    listen() {
        this.server.listen(this.options.port);
        return this;
    }
}
exports.MockServer = MockServer;
//# sourceMappingURL=index.js.map