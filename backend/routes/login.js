import express from 'express';
import { connectDb } from '../db.js';
import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/.secret.js';
import { authenticateToken } from '../utils/authentication.js';

const router = express.Router();
router.use(express.json());

// [POST] - inloggning
router.post('/', async (req, res) => {
	await connectDb();

	// Om inte body är komplett eller saknas
	if (!req.body || !req.body.name || !req.body.password) {
		res.status(412).send({
			message: 'Username or password is missing'
		}) // Precondition Failed
	}
	const reqName = req.body.name;
	const reqPassword = req.body.password;

	// Letar efter användarobjekt som matchar användarnamnet i databasen
	let maybeUser = await User.findOne({ name: reqName });

	// TODO: validering för att kolla att man får rätt datatyper i bodyn

	// Om användare ej finns
	if (!maybeUser) {
		res.status(401).send({
			message: 'Wrong username or password'
		})// Unauthorized
	}

	// Om användare finns:
	else if (maybeUser) {
		
		// Jämför lösenord med bcrypt:
		const isPasswordValid = await bcrypt.compare(
			reqPassword,
			maybeUser.password
			);
			
		// Om lösenordet inte stämmer överrens
		if (!isPasswordValid) {
			res.status(401).send({
				message: 'Wrong username or password'
			})// Unauthorized
		}
		
		else if (isPasswordValid) {
			let token = await generateToken(maybeUser);
			console.log('token: ', token);
			const tokenPackage = {
				token: token
			}
	
			console.log(
				`${maybeUser.name} logged in at ${new Date().toISOString()}`
			);
	
			res.send(tokenPackage);
		}
	}
});

async function addUser() {
	try {
		await connectDb();

		let password = '12345678';

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			name: 'JohnDoe',
			password: hashedPassword,
			_id: 1,
		});

		await user.save();
	} catch (error) {
		console.log(error);
	}
}

// Test för att kolla att authenticateToken-middleware fungerar, kan tas bort när det finns riktiga endpoints
router.get('/test', authenticateToken, async (req, res) => {
	console.log('Success in login/test');

	res.status(200).send({message: 'Success in login/test'});
});

export default router;
