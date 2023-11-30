import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export async function connectDb() {
	const db = process.env.MONGO_URI;

	try {
		await mongoose.connect(db);
		// ger tillbaka ett promise
		console.log('MongoDB ansluten..');
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
}

