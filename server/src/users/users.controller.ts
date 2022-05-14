/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../Injection/types';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { UserService } from './users.service';
import { sign } from 'jsonwebtoken';
import { IUserController } from './users.controller.interface';

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

  async login(
    req: Request,
    res: Response,
  ): Promise<void> {
    const result = await this.userService.login(req.body.name, req.body.password);
    if (!result) {
      console.log('user not found');
    }
    console.log(result);
    if (typeof result !== 'boolean') {
      const jwt = await this.signJWT(result.id, this.configService.get('SECRET'));
      res.json(jwt);
    }
  }

  async register(
    req: Request,
    res: Response,
  ): Promise<void> {
    const result = await this.userService.createUser(req.body.name, req.body.password);
    if (!result) {
      res.json('Inccorect values');
    } else res.json(result.rows[0]);
  }

  private signJWT(userId: number, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        {
          userId,
          iat: Math.floor(Date.now() / 1000),
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token as string);
        },
      );
    });
  }
}
