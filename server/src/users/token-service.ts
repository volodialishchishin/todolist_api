import jwt from 'jsonwebtoken';

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15s'});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30s'});
		return {
			accessToken,
			refreshToken
		};
	}


	async saveToken(): any {

	}
}

module.exports = new TokenService();
