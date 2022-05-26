import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { IExeptionFilter } from './exeption.filter.interface';
import {HTTPError} from './http-error.class';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  catch(err: Error | HTTPError, req: Request, res: Response ): void {
    if (err instanceof HTTPError) {
      res.status(err.status).json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
}
