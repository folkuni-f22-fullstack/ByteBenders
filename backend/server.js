import express from "express";
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { connectDb } from './db.js'
import Meal from "./models/Meals.js";

const port = 1523
const app = express()


// felmeddelandet: "The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string."
// kommer enbart fram när .env inte finns i samma folder som handlern som körs, fråga david om tips.


//middleware
app.use('/api', express.json())
app.use((req, res, next) => {
    console.log(`${req.method} ${res.url}`, req.body);
    next()
})

const __dirname = dirname(fileURLToPath(import.meta.url))
const pathToStaticFolder = join(__dirname, '../dist')
app.use(express.static(pathToStaticFolder))


// api

// app.use('/api/meals', mealsRouter )
// app.use('/api/orders', orderRouter)

// start
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})

connectDb()