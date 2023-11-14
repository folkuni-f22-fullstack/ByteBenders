import express from 'express';
import { connectDb } from './db.js';

const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
	if (!req.body || !req.body.username || !req.body.password) {
		res.sendStatus(400);
		return;
	}

	await connectDb();
});

// TODO: lägg till tillfällig funtion för att lägga till användare till DB
