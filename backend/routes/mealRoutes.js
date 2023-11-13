import express from "express";
import dotenv from 'dotenv'
import Meal from "../models/Meals.js";
import { connectDb } from "./db.js"

// felmeddelandet: "The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string."
// kommer enbart fram när .env inte finns i samma folder som handlern som körs, fråga david om tips.

const router = express.Router()
router.use(express.json())


// [GET] all
router.get('/', async (req, res) => {
    await connectDb()
    try {
        let meals = await Meal.find()
        console.log(meals);
        res.send(meals)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
})

// [GET] :id
router.get('/:id', async (req, res) => {
    await connectDb()
    try {
        let foundMeal = await Meal.findOne({ _id: req.params.id })
        if (foundMeal !== undefined) {
            console.log('Meal Found', foundMeal);
            res.status(302).send(foundMeal)
        } else {
            console.log('Could not find meal...aborting');
            res.sendStatus(404)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await connectDb()
        const meal = await Meal.deleteOne({ _id: req.params.id })
        console.log(meal);
        res.sendStatus(200)
    } catch (error) {
        console.log(error.message);
        res.sendStatus(404)
    }
})

// const newMeal = new Meal({
//     image: 'https://jow.fr/_next/image?url=https%3A%2F%2Fstatic.jow.fr%2F880x880%2Frecipes%2FEQ82JmY4aa4aog.png&w=2560&q=100',
//     _id: 1777,
//     name: 'MongoTestPlate8',
//     price: 110,
//     description: 'Description of the dish',
//     category: 'Meals',
//     subcategory: ['Sushi',],
//     allergenes: ['Allergen1'],
//     comment: ,
// });


// await connectDb()
// try {
//     await newMeal.save()
// } catch (error) {
//     console.log('Meal kunde inte pushas', error)
// }

// // [PRIVATE CHANNELS - POST] - Lägg till kanal
// router.post('/private', authenticateToken, async (req, res) => {
//     let maybeChannel = req.body

//     // VALIDERING
//     let approved = validateChannel(maybeChannel)
//     if (!approved) {



export default router