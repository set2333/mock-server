import type { Body, Request } from './types';

export const parseBody = async (request: Request): Promise<Body> =>
  new Promise(resolve => {
    let body = '';

    request
      .on('data', (chunk: string) => body += chunk)
      .on('end', () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve(parsedBody);
        } catch (e) {
          resolve({});
        }
      });
  });