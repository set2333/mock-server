"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockServer = void 0;
const http_1 = __importDefault(require("http"));
const consts_1 = require("./consts");
const Routes_1 = require("./Routes");
class MockServer {
    constructor(serverOptions) {
        this.serverOptions = Object.assign(consts_1.defaultOptions, serverOptions);
        this.roures = new Routes_1.Routes();
        this.server = http_1.default.createServer(this.roures.resolve.bind(this.roures));
    }
    add(method, path, handler) {
        this.roures.addHandler(method, path, handler);
        return this;
    }
    get(path, handler) {
        return this.add('GET', path, handler);
    }
    head(path, handler) {
        return this.add('HEAD', path, handler);
    }
    connect(path, handler) {
        return this.add('CONNECT', path, handler);
    }
    options(path, handler) {
        return this.add('OPTIONS', path, handler);
    }
    trace(path, handler) {
        return this.add('TRACE', path, handler);
    }
    patch(path, handler) {
        return this.add('PATCH', path, handler);
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
        this.server.listen(this.serverOptions.port);
        return this;
    }
}
exports.MockServer = MockServer;
//# sourceMappingURL=MockServer.js.map