import http from 'http';
import { defaultOptions } from './consts';
import Routes from './Routes';
import type { Handler, Path, Options } from './types';

export class MockServer {
  options: Options;
  roures: Routes;
  server: http.Server;

  constructor(options: Options) {
    this.options = Object.assign(defaultOptions, options);
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
    this.server.listen(this.options.port);

    return this;
  }
}
