import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).send({ err: err.message, statusCode: err.statusCode });
    } else {
      res.status(500).send({ err: err.message, statusCode: 500 });
    }
  }
}
