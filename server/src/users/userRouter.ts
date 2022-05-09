import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BaseController } from '../common/base.controller';
import db from '../db';
import { Request, Response } from 'express';


const generateJwt = (id:any, email:any) => {
	return jwt.sign(
		{id, email},
		'jwt-secret-key',
		{expiresIn: '24h'}
	);
};
export class UserRouter extends BaseController{
	constructor() {
		super();
		this.bindRoutes([
			{path: '/registration', method: 'post', func: this.registration},
			// {path: '/login', method: 'post', func: this.login},
			// {path: '/auth', method: 'get', func: this.check},
		]);
	}


	async registration(req:Request, res:Response) {
		const {name, password} = req.body;
		if (!name || !password) {
			console.log('enter password');
		}
		const candidate = await db.query('SELECT * FROM users where user_name = $1', [name]);
		if (candidate) {
			console.log('404');
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const newUser =  await db.query('INSERT INTO users(user_name,user_password) values($1,$2) RETURNING * ', [name,hashPassword]);
		const token = generateJwt(newUser.rows[0].id, newUser.rows[0].user_name);
		return res.json({token});
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	// async login(req, res, next) {
	//
	// }

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	// async check(req, res, next) {
	// }
}

