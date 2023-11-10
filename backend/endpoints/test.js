import { express } from "express";

const router = express.Router()
// const db = getDb()
// Kommentera in getDb när mongo samt funktion är skapad


// test endpoints

// Kontext: C* = Customer, E* = Employee
// vilka enpoints kommer vara relevanta för C* respektive E*

//get/read
//post 
//delete
//put


// Hämta alla meals
router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.meals)
})


// Hämta meal efter id
router.get('/:id', async (req, res) => {
    let id = Number(req.params.id)

    if (!isNaN(id)) {
        await db.read()
        const meal = db.data.meals.find((m) => m.id === id)
        if (meal) {
            res.send(meal)
        } else {
            res.status(404).send('Meal was not found')
        }
    } else {
        res.status(400).send('Invalid id.')
    }
})

