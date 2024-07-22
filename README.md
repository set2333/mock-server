## Description

A simple mock server. Suitable for quickly implementing simple http requests (for testing purposes)

## Installation

```bash
npm install git+https://github.com/set2333/mock-server
```
## Example 

```javascript
import { MockServer, Handlers } from "mock-server";

const server = new MockServer();

server
  .get('/text', Handlers.text('simple text'))
  .get('/users', Handlers.json({ id: 1, name: 'Bob' }))
  .get('/html', Handlers.html('./mock-data/index.html'))
  .get('/file', Handlers.file('./mock-data/file.txt'))
  .get('/params', Handlers.custom(({ query }) => query.testKey))
  .post('/send', Handlers.custom(({ body }) => body.message))
  .get('/auto', Handlers.auto('./mock-data/index.html'))
  .listen();
```

When creating, you can pass options:
```javascript
const server = new MockServer({
  port: 3001, // default 3000
});
```

The following handlers can be specified for the server (connect, delete, get, head, options, patch, post, put, trace).
First parameter path, second parameter handler.
You can pass a regular function as a handler, but it is more convenient to use handlers from Handlers:

- **Handlers.text** - will return plain text
- **Handlers.json** - will return JSON
- **Handlers.html** - will return an html file located at the passed path
- **Handlers.file** - will return a file located at the passed path
- **Handlers.custom** - The handler uses the function. The parameters contain:
  - *body* - parsed body from the request
  - *query* - parsed query from the request
  - *request* - http request
  - *response*- http response
- **Handlers.auto** - It will automatically call the required handler.
