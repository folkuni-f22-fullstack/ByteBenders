import { express } from "express";

const router = express.Router()
// const db = getDb()
// Kommentera in getDb när mongo samt funktion är skapad


// test endpoints

//get/read?
//post
//delete
//put

router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.meals)
})