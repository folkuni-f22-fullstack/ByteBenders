import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET_KEY;

export function authenticateToken(req, res, next) {
	console.log('authenticateToken: req.body: ', req.body);
	let token = req.headers?.authorization;
	console.log('authenticateToken: token: ', token);

	if (!token) {
		console.log('!token, inside auth-middleware');
		return res.sendStatus(400);
	}

	jwt.verify(token, secret, (err, user) => {
		console.log(user);
		if (err) {
			console.log(err);
			return res.sendStatus(400);
		}

		req.user = user;
		next();
	});
}
