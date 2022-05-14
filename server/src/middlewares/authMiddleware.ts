import { NextFunction, Request, Response } from 'express';
import { verify, VerifyErrors } from 'jsonwebtoken';
import { IMiddleware } from '../interfaces/middleware.interface';

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      verify(req.headers.authorization.split(' ')[1], this.secret, (err:VerifyErrors | null, payload:any) => {
        if (err) {
          next();
        } else if (payload) {
          req.context = {
            id: payload.userId,
          };
          next();
        }
      });
    } else {
      next();
    }
  }
}
