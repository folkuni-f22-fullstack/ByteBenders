import express from "express";
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const port = 1523
const app = express()


// Kontrollera att DB import fungerar med MongoDB


//middleware
app.use('/api', express.json())
app.use((req, res, next) => {
    console.log(`${req.method} ${red.url}`, req.body);
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