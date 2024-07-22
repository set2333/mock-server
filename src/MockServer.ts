import http from 'http';
import { defaultOptions } from './consts';
import Routes from './Routes';
import type { Handler, Path, Options } from './types';

export class MockServer {
  serverOptions: Options;
  roures: Routes;
  server: http.Server;

  constructor(serverOptions: Options) {
    this.serverOptions = Object.assign(defaultOptions, serverOptions);
    this.roures = new Routes();
    this.server = http.createServer(this.roures.resolve.bind(this.roures));
  }

  add(method: Request['method'], path: Path, handler: Handler) {
    this.roures.addHandler(method, path, handler);

    return this;
  }

  get(path: Path, handler: Handler) {
    return this.add('GET', path, handler);
  }

  head(path: Path, handler: Handler) {
    return this.add('HEAD', path, handler);
  }

  connect(path: Path, handler: Handler) {
    return this.add('CONNECT', path, handler);
  }

  options(path: Path, handler: Handler) {
    return this.add('OPTIONS', path, handler);
  }

  trace(path: Path, handler: Handler) {
    return this.add('TRACE', path, handler);
  }

  patch(path: Path, handler: Handler) {
    return this.add('PATCH', path, handler);
  }

  post(path: Path, handler: Handler) {
    return this.add('POST', path, handler);
  }

  put(path: Path, handler: Handler) {
    return this.add('PUT', path, handler);
  }

  delete(path: Path, handler: Handler) {
    return this.add('DELETE', path, handler);
  }

  listen() {
    this.server.listen(this.serverOptions.port);

    return this;
  }
}
