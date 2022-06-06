export class HTTPError extends Error {
  statusCode:number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }

  static badRequest() {
    return new HTTPError(400, 'badRequest');
  }

  static internal() {
    return new HTTPError(500, 'internal');
  }

  static forbidden() {
    return new HTTPError(403, 'authorization error');
  }

  static NoTitle() {
    return new HTTPError(421, 'No title');
  }

  static NoTodo() {
    return new HTTPError(420, 'No todo');
  }
}
