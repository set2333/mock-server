import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { headers } from '../src/consts';
import { MockServer } from '../src/MockServer';
import { Handlers } from '../src/Handlers';

const prepareHeadersToCompare = (headersList: Record<string, string>): string[] => Object
  .entries(headersList)
  .map(([key, value]) => `${key.toLowerCase()}:${value.toLowerCase()}`);


describe('Test MockServer', () => {
  const server = new MockServer();
  server.get('/text', Handlers.text('Test text'));
  server.post('/users', Handlers.json({ users: [{ id: 1, login: 'admin' }] }));
  server.get('/file', Handlers.file('./tests/data/test.txt'));
  server.post('/sum', Handlers.custom<{ a: number; b: number; }, unknown>(({ body }) => String((body?.a || 0) + (body?.b || 0) )));

  test('GET text', async () => {
    await request(server.server)
      .get('/text')
      .expect(response => {
        const headersFromResponse = prepareHeadersToCompare(response.headers);
        expect(prepareHeadersToCompare(headers).every(header => headersFromResponse.includes(header))).toBeTruthy();
        expect(response.status).toBe(200);
        expect(response.text).toBe('Test text');
      });
  });
  test('POST json', async () => {
    await request(server.server)
      .post('/users')
      .expect(response => {
        const headersFromResponse = prepareHeadersToCompare(response.headers);
        expect(prepareHeadersToCompare(headers).every(header => headersFromResponse.includes(header))).toBeTruthy();
        expect(response.status).toBe(200);
        expect(response.text).toBe('{"users":[{"id":1,"login":"admin"}]}');
      });
  });
  test('Get file', async () => {
    await request(server.server)
      .get('/file')
      .expect(response => {
        const headersFromResponse = prepareHeadersToCompare(response.headers);
        expect(prepareHeadersToCompare(headers).every(header => headersFromResponse.includes(header))).toBeTruthy();
        expect(response.status).toBe(200);
        expect(response.text).toBe('Test data from file');
      });
  });
  test('Post custom', async () => {
    await request(server.server)
      .post('/sum')
      .send({ a: 1, b: 2 })
      .expect(response => {
        const headersFromResponse = prepareHeadersToCompare(response.headers);
        expect(prepareHeadersToCompare(headers).every(header => headersFromResponse.includes(header))).toBeTruthy();
        expect(response.status).toBe(200);
        expect(response.text).toBe('3');
      });
  });
});
