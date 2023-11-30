import express from 'express';
import Meal from '../models/Meals.js';
import { connectDb } from '../db.js';

const router = express.Router();
router.use(express.json());

let textColor = {
    yellow: "\x1b[33m",
    white: "\x1b[37m",
    cyan: "\x1b[36m",
	green: "\x1b[32m",
	red: "\x1b[31m"
};

// [GET] all
router.get('/', async (req, res) => {
	await connectDb();
	try {
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Searching for meals...`);
		let meals = await Meal.find();
		console.log(`${textColor.green}[SUCCESS]${textColor.white} Found and returned ${meals.length} meals.`);
		res.send(meals);
	} catch (error) {
		console.log(`${textColor.red}[ERROR]${textColor.white}: `, error);
		res.sendStatus(400);
	}
});

// [GET] :id
router.get('/:id', async (req, res) => {
	await connectDb();
	try {
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Searching for specific meal...`);
		let foundMeal = await Meal.findOne({ _id: req.params.id });
		
		if (foundMeal !== undefined) {
			console.log(`${textColor.green}[SUCCESS]${textColor.white} Found and returned ${foundMeal}.`);
			res.status(302).send(foundMeal);
		} else {
			console.log('[ERROR] - Could not find meal...aborting');
			res.sendStatus(404);
		}
	} catch (error) {
		console.log(`${textColor.red}[ERROR]${textColor.white}: `, error);
		res.sendStatus(400);
	}
});

// [DELETE] TODO: Används ens denna? I och med _id i deleteOne.
router.delete('/:id', async (req, res) => {
	try {
		await connectDb();
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Deleting order`);
		const meal = await Meal.deleteOne({ _id: req.params.id });
		console.log(`${textColor.green}[SUCCESS]${textColor.white} Found ${meal}!`);
		res.sendStatus(200);
	} catch (error) {
		console.log(`${textColor.red}[ERROR]${textColor.white}: `, error.message);
		res.sendStatus(404);
	}
});

// [POST]
router.post('/', async (req, res) => {
	try {
		await connectDb();
		const newMealData = req.body;
		const newMeal = new Meal(newMealData);
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Saving new meal...`);
		const savedMeal = await newMeal.save();
		console.log(`${textColor.green}[SUCCESS]${textColor.white} Meal created: `, savedMeal);
		res.status(201).send(savedMeal);
	} catch (error) {
		console.log(`${textColor.red}[ERROR]${textColor.white}: `, error.message);
		res.sendStatus(400);
	}
});

export default router;
