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
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const Routes_1 = require("../src/Routes");
(0, globals_1.describe)('Test Routes', () => {
    (0, globals_1.test)('Route resolved', () => __awaiter(void 0, void 0, void 0, function* () {
        const routes = new Routes_1.Routes();
        const handler = () => new Promise(resolve => routes.addHandler('GET', '/test', resolve));
        const request = {
            method: 'GET',
            url: '/test?id=1',
            on: function (event, cb) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const result = event === 'data' ? '{"bodyValue": 1}' : null;
                cb(result);
                return this;
            },
        };
        const response = {};
        routes.resolve(request, response);
        const { query, body, request: resolvedRequest, response: resolvedResponse } = yield handler();
        (0, globals_1.expect)(query).toEqual({ id: '1' });
        (0, globals_1.expect)(body).toEqual({ bodyValue: 1 });
        (0, globals_1.expect)(request).toEqual(resolvedRequest);
        (0, globals_1.expect)(response).toEqual(resolvedResponse);
    }));
});
//# sourceMappingURL=Routes.test.js.map