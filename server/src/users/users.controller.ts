import { sign } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../common/base.controller';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { UserService } from './users.service';
import { IUserController } from './users.controller.interface';
import { TYPES } from '../Injection/types';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    super();
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
      },
    ]);
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userService.login(req.body.name, req.body.password);
    if (!result) {
      return next(new HTTPError(401, 'Authorization error', 'login'));
    }
    if (typeof result !== 'boolean') {
      // @ts-ignore
      const jwt = sign(result.id, this.configService.get('SECRET'));
      res.json(jwt);
    }
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { password } = req.body;
    const { name } = req.body;

    const result = await this.userService.createUser(name, password);
    if (!result) {
      return next(new HTTPError(422, 'User already exist or your passwrod is invalid'));
    }
    res.json(result);
  }
}
