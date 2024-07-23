import { describe, expect, test } from '@jest/globals';
import { Routes } from '../src/Routes';
import type { HandlerProps, Request, Response } from '../src/types';

describe('Test Routes', () => {
  test('Route resolved', async () => {
    const routes = new Routes();
    const handler = () => new Promise<HandlerProps>(resolve => routes.addHandler('GET', '/test', resolve));
    const request = {
      method: 'GET',
      url: '/test?id=1',
      on: function(event, cb) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = event === 'data' ? '{"bodyValue": 1}' : null;
        cb(result);
       
        return this;
      },
    } as Request;
    const response = {} as Response;
    routes.resolve(request, response);

    const { query, body, request: resolvedRequest, response: resolvedResponse } = await handler();
    expect(query).toEqual({ id: '1' });
    expect(body).toEqual({ bodyValue: 1 });
    expect(request).toEqual(resolvedRequest);
    expect(response).toEqual(resolvedResponse);
  });
});