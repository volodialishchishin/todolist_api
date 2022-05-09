import {Router} from 'express';
import {IControllerRoute} from '../interfaces/router.interface';
import {injectable} from 'inversify';
// @ts-ignore
@injectable()
export abstract class BaseController  {
	private readonly _router: Router;

	protected constructor() {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
