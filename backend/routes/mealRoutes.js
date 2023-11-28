import express from 'express';
import Meal from '../models/Meals.js';
import { connectDb } from '../db.js';

const router = express.Router();
router.use(express.json());

// [GET] all
router.get('/', async (req, res) => {
	await connectDb();
	try {
		let meals = await Meal.find();
		console.log(meals);
		res.send(meals);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

// [GET] :id
router.get('/:id', async (req, res) => {
	await connectDb();
	try {
		let foundMeal = await Meal.findOne({ _id: req.params.id });
		if (foundMeal !== undefined) {
			console.log('Meal Found', foundMeal);
			res.status(302).send(foundMeal);
		} else {
			console.log('Could not find meal...aborting');
			res.sendStatus(404);
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
});

// [DELETE]
router.delete('/:id', async (req, res) => {
	try {
		await connectDb();
		const meal = await Meal.deleteOne({ _id: req.params.id });
		console.log(meal);
		res.sendStatus(200);
	} catch (error) {
		console.log(error.message);
		res.sendStatus(404);
	}
});

// [POST]
router.post('/', async (req, res) => {
	try {
		await connectDb();
		const newMealData = req.body;
		const newMeal = new Meal(newMealData);
		const savedMeal = await newMeal.save();
		console.log('Meal created:', savedMeal);
		res.status(201).send(savedMeal);
	} catch (error) {
		console.error(error.message);
		res.sendStatus(400);
	}
});

export default router;
