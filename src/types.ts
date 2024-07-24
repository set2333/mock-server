import type { IncomingMessage, ServerResponse } from 'http';

export type HandlerProps<TBody = object, TQuery = object> = {
  request: Request;
  response: Response;
  body: Body<TBody>;
  query: Query<TQuery>;
}

export type Handler<TBody = object, TQuery = object, TReturn = void> = (props: HandlerProps<TBody, TQuery>) => TReturn;

export type Path = string;

export type Request = IncomingMessage;

export type Response = ServerResponse;

export type Body<T = object> = T | undefined;

export type Query<T = object> = T | undefined;

export type Options = {
  port?: number;
}
