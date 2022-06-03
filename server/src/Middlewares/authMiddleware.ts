import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify, VerifyErrors } from 'jsonwebtoken';
import { IMiddleware } from '../Interfaces/middleware.interface';
export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      verify(req.headers.authorization.split(' ')[1], this.secret, (err:VerifyErrors | null, payload:JwtPayload | string | undefined) => {
        if (err) {
          return next(err);
        } if (typeof payload === 'string') {
          req.context = {
            userId: payload,
          };
          next();
        }
      });
    } else {
      next();
    }
  }
}
