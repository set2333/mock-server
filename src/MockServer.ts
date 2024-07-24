import http from 'http';
import { defaultOptions } from './consts';
import { Routes } from './Routes';
import type { Handler, Path, Options } from './types';

export class MockServer {
  serverOptions: Options;
  roures: Routes;
  server: http.Server;

  constructor(serverOptions?: Options) {
    this.serverOptions = Object.assign(defaultOptions, serverOptions ?? {});
    this.roures = new Routes();
    this.server = http.createServer(this.roures.resolve.bind(this.roures));
  }

  add<TBody, TQuery>(method: Request['method'], path: Path, handler: Handler<TBody, TQuery>) {
    this.roures.addHandler<TBody, TQuery>(method, path, handler);

    return this;
  }

  get<TBody, TQuery>(path: Path, handler: Handler<TBody, TQuery>) {
    return this.add<TBody, TQuery>('GET', path, handler);
  }

  head<TBody, TQuery>(path: Path, handler: Handler<TBody, TQuery>) {
    return this.add<TBody, TQuery>('HEAD', path, handler);
  }

  connect<TBody, TQuery>(path: Path, handler: Handler<TBody, TQuery>) {
    return this.add<TBody, TQuery>('CONNECT', path, handler);
  }

  options<TBody, TQuery>(path: Path, handler: Handler<TBody, TQuery>) {
    return this.add<TBody, TQuery>('OPTIONS', path, handler);
  }

  trace<TBody, TQuery>(path: Path, handler: Handler<TBody, TQuery>) {
    return this.add<TBody, TQuery>('TRACE', path, handler);
  }

  patch<TBody, TQuery>(path: Path, handler: Handler<TBody, TQuery>) {
    return this.add<TBody, TQuery>('PATCH', path, handler);
  }

  post<TBody, TQuery>(path: Path, handler: Handler<TBody, TQuery>) {
    return this.add<TBody, TQuery>('POST', path, handler);
  }

  put<TBody, TQuery>(path: Path, handler: Handler<TBody, TQuery>) {
    return this.add<TBody, TQuery>('PUT', path, handler);
  }

  delete<TBody, TQuery>(path: Path, handler: Handler<TBody, TQuery>) {
    return this.add<TBody, TQuery>('DELETE', path, handler);
  }

  listen() {
    this.server.listen(this.serverOptions.port);

    return this;
  }
}
