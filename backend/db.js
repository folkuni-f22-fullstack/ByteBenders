import mongoose from "mongoose";
import dotenv from 'dotenv'

export async function connectDb() {
    dotenv.config()
    const db = process.env.mongoURI

    try {
        await mongoose.connect(db) 
        // ger tillbaka ett promise
        console.log('MongoDB ansluten..')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

connectDb()