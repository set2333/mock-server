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
const Handlers_1 = require("../src/Handlers");
const consts_1 = require("../src/consts");
const makeHandlerProps = () => ({
    response: Object.create({
        writeHead: (head, headers) => {
            const self = this !== null && this !== void 0 ? this : { head: 0, headers: '' };
            self.head = head;
            self.headers = headers;
        },
        end: (result) => {
            const self = this !== null && this !== void 0 ? this : { result: '' };
            self.result = result;
            return this;
        },
    }),
    request: {},
    body: { bodyParam: 'bodyParamValue' },
    query: { queryParam: 'queryParamValue' },
});
(0, globals_1.describe)('Test Handlers', () => {
    (0, globals_1.test)('text', () => {
        const handlerProps = makeHandlerProps();
        const handler = Handlers_1.Handlers.text('Text for test');
        (0, globals_1.expect)(handler(handlerProps)).toEqual({ head: 200, headers: consts_1.headers, result: 'Text for test' });
    });
    (0, globals_1.test)('json', () => {
        const handlerProps = makeHandlerProps();
        const handler = Handlers_1.Handlers.json({ value: 'Test JSON value' });
        (0, globals_1.expect)(handler(handlerProps)).toEqual({ head: 200, headers: consts_1.headers, result: '{"value":"Test JSON value"}' });
    });
    (0, globals_1.test)('custom', () => {
        const handlerProps = makeHandlerProps();
        const handler = Handlers_1.Handlers.custom(({ body, query }) => ({ body, query }));
        (0, globals_1.expect)(handler(handlerProps)).toEqual({ head: 200, headers: consts_1.headers, result: { body: handlerProps.body, query: handlerProps.query } });
    });
    (0, globals_1.test)('file', () => __awaiter(void 0, void 0, void 0, function* () {
        const handlerProps = makeHandlerProps();
        const handler = Handlers_1.Handlers.file('./tests/data/test.txt');
        (0, globals_1.expect)(yield handler(handlerProps)).toEqual({ head: 200, headers: consts_1.headers, result: Buffer.from('Test data from file') });
    }));
    (0, globals_1.test)('html', () => __awaiter(void 0, void 0, void 0, function* () {
        const handlerProps = makeHandlerProps();
        const handler = Handlers_1.Handlers.html('./tests/data/test.html');
        (0, globals_1.expect)(yield handler(handlerProps)).toEqual({ head: 200, headers: consts_1.headers, result: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Test HTML file</h1>\n</body>\n</html>' });
    }));
});
(0, globals_1.describe)('Test Auto Handlers', () => {
    (0, globals_1.test)('text', () => {
        const handlerProps = makeHandlerProps();
        const handler = Handlers_1.Handlers.auto('Text for test');
        (0, globals_1.expect)(handler(handlerProps)).toEqual({ head: 200, headers: consts_1.headers, result: 'Text for test' });
    });
    (0, globals_1.test)('json', () => {
        const handlerProps = makeHandlerProps();
        const handler = Handlers_1.Handlers.auto({ value: 'Test JSON value' });
        (0, globals_1.expect)(handler(handlerProps)).toEqual({ head: 200, headers: consts_1.headers, result: '{"value":"Test JSON value"}' });
    });
    (0, globals_1.test)('custom', () => {
        const handlerProps = makeHandlerProps();
        const handler = Handlers_1.Handlers.auto(({ body, query }) => ({ body, query }));
        (0, globals_1.expect)(handler(handlerProps)).toEqual({ head: 200, headers: consts_1.headers, result: { body: handlerProps.body, query: handlerProps.query } });
    });
    (0, globals_1.test)('file', () => __awaiter(void 0, void 0, void 0, function* () {
        const handlerProps = makeHandlerProps();
        const handler = Handlers_1.Handlers.auto('./tests/data/test.txt');
        (0, globals_1.expect)(yield handler(handlerProps)).toEqual({ head: 200, headers: consts_1.headers, result: Buffer.from('Test data from file') });
    }));
    (0, globals_1.test)('html', () => __awaiter(void 0, void 0, void 0, function* () {
        const handlerProps = makeHandlerProps();
        const handler = Handlers_1.Handlers.auto('./tests/data/test.html');
        (0, globals_1.expect)(yield handler(handlerProps)).toEqual({ head: 200, headers: consts_1.headers, result: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Test HTML file</h1>\n</body>\n</html>' });
    }));
});
//# sourceMappingURL=Handlers.test.js.map