declare namespace Express {
  export interface Request {
    context: {
      userId: string
    };
  }
}
