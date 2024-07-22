import type { IncomingMessage, ServerResponse } from 'http';

export type HandlerProps = {
  request: Request;
  response: Response;
  body: Body;
  query: Query;
}

export type Handler = (props: HandlerProps) => void;

export type Path = string;

export type Request = IncomingMessage;

export type Response = ServerResponse;

export type Body = object | undefined;

export type Query = object | undefined;

export type Options = {
  port?: number;
}
