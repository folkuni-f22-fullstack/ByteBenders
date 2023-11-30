import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();
const secret = process.env.SECRET_KEY;


export async function generateToken(user) {

	const payload = {
		_id: user._id,
		name: user.name,
	};

	return jwt.sign(payload, secret, { expiresIn: '1h' });
}

// Skapa en slumpmässig krypterad nyckel
async function generateKey() {
	const buffer = randomBytes(32);
	const secretKey = buffer.toString('hex');

	try {
		const saltRounds = 10;
		// salt: slumpmässig(a) sträng(ar) läggs till i det som ska krypteras
		// (gör så att två identiska lösenord/nycklar inte resulterar i samma hashvärde)

		const hashedKey = await bcrypt.hash(secretKey, saltRounds);
		return hashedKey;
	} catch (error) {
		throw new Error('Error generating secret key');
	}
}

export const secretKey = generateKey();
