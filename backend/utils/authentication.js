import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET_KEY;

export function authenticateToken(req, res, next) {
	console.log('*********första i authenticate**********')
	console.log('authenticateToken: req.body: ', req?.body);
	let token = req.headers?.authorization;
	console.log('authenticateToken: token: ', token);

	if (!token) {
		console.log('!token, inside auth-middleware');
		res.status(400).send({message: 'Missing token'});
	}

	jwt.verify(token, secret, (err, user) => {
		console.log(user);
		if (err) {
			console.log(err);
			res.status(400).send({message: 'Wrong token'});
		}

		req.user = user;
		next();
	});
}
