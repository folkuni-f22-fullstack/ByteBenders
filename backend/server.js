import express from "express";
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { connectDb } from "./db";

const port = process.send.mongoURI
const app = express()

connectDb()
// Kontrollera att DB import fungerar med MongoDB

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '../dist')
app.use(express.static(dist))

//middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(`${req.method} ${red.url}`, req.body);
    next()
})



// api

app.use('/api/meals', mealsRouter )
app.use('/api/orders', orderRouter)







// start
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})