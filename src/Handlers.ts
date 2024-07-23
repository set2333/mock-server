import fs from 'fs';
import { headers } from './consts';
import type { Handler, Path } from './types';

export class Handlers {
  static custom(cb: Handler): Handler {
    return (params) => {
      params.response.writeHead(200, headers);

      return params.response.end(cb(params));
    };
  }

  static text(text: string): Handler {
    return ({ response }) => {
      response.writeHead(200, headers);

      return response.end(String(text));
    };
  }

  static json(json: object): Handler {
    return ({ response }) => {
      response.writeHead(200, headers);

      return response.end(JSON.stringify(json));
    };
  }

  static file(file: Path): Handler {
    return ({ response }) => {
      response.writeHead(200, headers);

      return new Promise(resolve => {
        fs.readFile(file, (_, data) => resolve(data));
      }).then((data) => response.end(data));
    };
  }

  static html(htmlFile: Path): Handler {
    return ({ response }) => {
      response.writeHead(200, headers);

      return new Promise(resolve => {
        fs.readFile(htmlFile, { encoding: 'utf-8' }, (_, data) => resolve(data));
      }).then((data) => response.end(data));
    };
  }

  static auto(params: string | object | Path | Handler): Handler {
    if (typeof params === 'function') {
      return Handlers.custom(params as Handler);
    } else if (typeof params ==='object') {
      return Handlers.json(params);
    } else {
      try {
        fs.readFileSync(params);

        return params.match(/.+\.html$/) ? Handlers.html(params) : Handlers.file(params);
      } catch (e) {
        return Handlers.text(params);
      }
    }
  }
}
