import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { connectDb } from './db.js'
import mealrouter from  './routes/mealRoutes.js'
import orderrouter from './routes/orderRoutes.js'
import cors from 'cors'

const port = 1523
const app = express()

export const secret = process.env.MONGO_URI


//middleware
app.use(cors())
app.use('/api', express.json())
app.use((req, res, next) => {
    console.log(`${req.method} ${res.url}`, req.body);
    next()
})

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToStaticFolder = join(__dirname, '../dist');
app.use(express.static(pathToStaticFolder));

// api
app.use('/api/meals', mealrouter )
app.use('/api/orders', orderrouter)

// start
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});

connectDb();
