"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const url_1 = __importDefault(require("url"));
const utils_1 = require("./utils");
class Routes {
    constructor() {
        this.routes = new Map();
    }
    addHandler(method, path, handler) {
        this.routes.set(method, Object.assign(Object.assign({}, (this.routes.get(method))), { [path]: handler }));
    }
    resolve(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const body = yield (0, utils_1.parseBody)(request);
            const { pathname, query } = url_1.default.parse((request === null || request === void 0 ? void 0 : request.url) || '', true);
            yield ((_b = (_a = this.routes.get(request.method)) === null || _a === void 0 ? void 0 : _a[pathname || '']) === null || _b === void 0 ? void 0 : _b.call(_a, { body, query, request, response }));
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map