import express from 'express';
import { connectDb } from '../db.js';
import User from '../models/Users.js';
import bcrypt from 'bcrypt';

const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
	await connectDb();
	if (!req.body || !req.body.name || !req.body.password) {
		res.sendStatus(400);
	}
	let maybeUser = await User.findOne({ name: req.body.name });

	if (maybeUser) {
		console.log('Sucess');
	} else {
		console.log('Failed');
	}
});

// TODO: lägg till tillfällig funtion för att lägga till användare till DB
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

export default router;
// addUser();
