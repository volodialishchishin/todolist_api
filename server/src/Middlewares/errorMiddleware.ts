import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IExeptionFilter } from './errorMiddleware.interface';
import { HTTPError } from '../Errors/http-error.class';
import 'reflect-metadata';
import { TYPES } from '../Injection/types';
import { ILogger } from '../Common/logger/logger.interface';

@injectable()
export class ErrorMiddleware implements IExeptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).send({ err: err.message, statusCode: err.statusCode });
      this.logger.error(`[ERROR] ${err.statusCode}: ${err.message}`);
    } else {
      res.status(500).send({ err: err.message, statusCode: 500 });
      this.logger.error('[ERROR] Unexpected');
    }
  }
}
