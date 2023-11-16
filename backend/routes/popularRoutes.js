import express from "express";
import Meal from "../models/Meals.js";
import Popular from "../models/Popular.js";
import { connectDb } from "../db.js";

const router = express.Router();
router.use(express.json());

// [GET] all
router.get("/", async (req, res) => {
	try {
		await connectDb();
		
		// Hämtar alla rätter från databas
		const meals = await Meal.find();
		console.log("Meals fetched");

		// Hämtar veckonummret + items från Popularmodellen
		const storedPopular = await Popular.findOne({ _id: 1 }).select("items forWeek");
		console.log("storedPopular: ", storedPopular);

		// Extrahera veckonummer från resultatet
		const storedWeek = storedPopular.forWeek
		console.log('storedWeek:', storedWeek);

		// Jämför veckonummret med aktuellt veckonummer
		const thisWeek = getWeek()

		let listToSend; // listToSend = vad endpointen returnerar

		// Generera nya rätter om veckonummren skiljer sig åt
		if (storedWeek !== thisWeek) {
			listToSend = generateMeals(meals)
			await Popular.findOneAndUpdate(
                { _id: 1 },
                { forWeek: thisWeek, items: listToSend },
                { new: true }
            );
		} else {
			// Returnera befintliga rätter om veckonummret är detsamma
			listToSend = storedPopular.items;
		}

		// Skicka listToSend som svar
		res.send(listToSend)

	} catch (error) {
		console.log(error);
        res.status(500).send('Internal Server Error');
	}

});

// Hjälpfunktion som ger nytt veckonummer
function getWeek() {
    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
}

// Hjälpfunktion för slumpmässigt nummer
function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Hjälpfunktion: Skapa en array med slumpmässiga rätter
function generateMeals(meals) {
    let weeklyDishes = [];
    for (let i = 0; i < 5; i++) {
        let dish = meals[randomizer(0, meals.length - 1)];
        !weeklyDishes.includes(dish) && weeklyDishes.push(dish);
    }
    return weeklyDishes;
}

export default router;
