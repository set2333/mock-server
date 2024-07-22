import url from 'url';
import { parseBody } from './utils';
import type { Handler, Path, Request, Response } from './types';

class Routes {
  routes;

  constructor() {
    this.routes = new Map<Request['method'], Record<Path, Handler>>();
  }

  addHandler(method: Request['method'], path: Path, handler: Handler) {
    this.routes.set(method, { ...(this.routes.get(method)), [path]: handler });
  }

  async resolve(request: Request, response: Response) {
    const body = await parseBody(request);
    const { pathname, query } = url.parse(request?.url || '', true);
    await this.routes.get(request.method)?.[pathname || '']?.({ body, query, request, response });
  }
}

export default Routes;