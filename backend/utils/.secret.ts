import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import dotenv from 'dotenv';

export async function generateToken(user) {
	dotenv.config();
	const secret = secretKey;

	const payload = {
		uuid: user.uuid,
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
		console.log(hashedKey);
		return hashedKey;
	} catch (error) {
		throw new Error('Error generating secret key');
	}
}

export const secretKey = generateKey();
