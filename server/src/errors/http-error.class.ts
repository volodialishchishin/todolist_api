export class HTTPError extends Error {
  status:number;

  constructor(status:number, message:string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest() {
    return new HTTPError(404, 'badRequest');
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
