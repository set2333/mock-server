import { describe, expect, test } from '@jest/globals';
import { Handlers } from '../src/Handlers';
import { headers } from '../src/consts';
import type { HandlerProps, Request } from '../src/types';

const makeHandlerProps = (): HandlerProps => ({
  response: Object.create({
    writeHead: (head: number, headers: string) => {
      const self = this ?? { head: 0, headers: '' };
      self.head = head;
      self.headers = headers;
    },
    end: (result: string) => {
      const self = this ?? { result: ''};
      self.result = result;

      return this;
    },
  }),
  request: {} as Request,
  body: { bodyParam: 'bodyParamValue' },
  query: { queryParam: 'queryParamValue' },
});

describe('Test Handlers', () => {
  test('text', () => {
    const handlerProps = makeHandlerProps();    
    const handler = Handlers.text('Text for test');
    expect(handler(handlerProps)).toEqual({ head: 200, headers, result: 'Text for test' });
  });
  test('json', () => {
    const handlerProps = makeHandlerProps();    
    const handler = Handlers.json({ value: 'Test JSON value'});
    expect(handler(handlerProps)).toEqual({ head: 200, headers, result: '{"value":"Test JSON value"}' });
  });
  test('custom', () => {
    const handlerProps = makeHandlerProps();    
    const handler = Handlers.custom(({ body, query }) => ({ body, query }));
    expect(handler(handlerProps)).toEqual({ head: 200, headers, result: { body: handlerProps.body, query: handlerProps.query } });
  });
  test('file', async () => {
    const handlerProps = makeHandlerProps();    
    const handler = Handlers.file('./tests/data/test.txt');
    expect(await handler(handlerProps)).toEqual({ head: 200, headers, result: Buffer.from('Test data from file') });
  });
  test('html', async () => {
    const handlerProps = makeHandlerProps();    
    const handler = Handlers.html('./tests/data/test.html');
    expect(await handler(handlerProps)).toEqual({ head: 200, headers, result: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Test HTML file</h1>\n</body>\n</html>' });
  });
});

describe('Test Auto Handlers', () => {
  test('text', () => {
    const handlerProps = makeHandlerProps();    
    const handler = Handlers.auto('Text for test');
    expect(handler(handlerProps)).toEqual({ head: 200, headers, result: 'Text for test' });
  });
  test('json', () => {
    const handlerProps = makeHandlerProps();    
    const handler = Handlers.auto({ value: 'Test JSON value'});
    expect(handler(handlerProps)).toEqual({ head: 200, headers, result: '{"value":"Test JSON value"}' });
  });
  test('custom', () => {
    const handlerProps = makeHandlerProps();    
    const handler = Handlers.auto(({ body, query }) => ({ body, query }));
    expect(handler(handlerProps)).toEqual({ head: 200, headers, result: { body: handlerProps.body, query: handlerProps.query } });
  });
  test('file', async () => {
    const handlerProps = makeHandlerProps();    
    const handler = Handlers.auto('./tests/data/test.txt');
    expect(await handler(handlerProps)).toEqual({ head: 200, headers, result: Buffer.from('Test data from file') });
  });
  test('html', async () => {
    const handlerProps = makeHandlerProps();    
    const handler = Handlers.auto('./tests/data/test.html');
    expect(await handler(handlerProps)).toEqual({ head: 200, headers, result: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Test HTML file</h1>\n</body>\n</html>' });
  });
});
