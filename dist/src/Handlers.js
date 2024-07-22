"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handlers = void 0;
const fs_1 = __importDefault(require("fs"));
const consts_1 = require("./consts");
class Handlers {
    static custom(cb) {
        return (params) => {
            params.response.writeHead(200, consts_1.headers);
            return params.response.end(cb(params));
        };
    }
    static text(text) {
        return ({ response }) => {
            response.writeHead(200, consts_1.headers);
            return response.end(String(text));
        };
    }
    static json(json) {
        return ({ response }) => {
            response.writeHead(200, consts_1.headers);
            return response.end(JSON.stringify(json));
        };
    }
    static file(file) {
        return ({ response }) => {
            response.writeHead(200, consts_1.headers);
            fs_1.default.readFile(file, (_, data) => response.end(data));
        };
    }
    static html(htmlFile) {
        return ({ response }) => {
            response.writeHead(200, consts_1.headers);
            fs_1.default.readFile(htmlFile, { encoding: 'utf-8' }, (_, data) => response.end(data));
        };
    }
    static auto(params) {
        if (typeof params === 'function') {
            return Handlers.custom(params);
        }
        else if (typeof params === 'object') {
            return Handlers.json(params);
        }
        else {
            try {
                fs_1.default.readFileSync(params);
                return params.match(/.+\.html$/) ? Handlers.html(params) : Handlers.file(params);
            }
            catch (e) {
                return Handlers.text(params);
            }
        }
    }
}
exports.Handlers = Handlers;
//# sourceMappingURL=Handlers.js.map