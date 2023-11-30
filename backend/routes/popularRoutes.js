import express from "express";
import Meal from "../models/Meals.js";
import Popular from "../models/Popular.js";
import { connectDb } from "../db.js";

const router = express.Router();
router.use(express.json());

let textColor = {
    yellow: "\x1b[33m",
    white: "\x1b[37m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
};

// [GET] all
router.get("/", async (req, res) => {

	/* ÖVERGRIPANDE LOGIK: 
	Hämta veckonummer i DB och jämför med dagens veckonummer. 
	Om det skiljer sig, generera nya populära rätter och returnera.
	Annars, returnera redan existerande populära rätter.
	*/

    try {
        await connectDb();

        // Hämtar alla rätter från databas
        const meals = await Meal.find();

        // Hämtar veckonummret + items från Popularmodellen
        const storedPopularObj = await Popular.findOne({ _id: 1 }).select(
            "items forWeek"
        );

        // Extrahera veckonummer från resultatet
        const weekInDb = storedPopularObj.forWeek;

        // Jämför veckonummret med aktuellt veckonummer
        const weekNow = getWeek();

        let listToSend; // listToSend = vad endpointen sen ska returnera

        // Generera nya rätter om veckonummren skiljer sig åt
        if (weekInDb !== weekNow) {
            listToSend = generateMeals(meals);

            console.log(
                `${textColor.cyan}**** POPULAR DISHES: Generating new dishes...${textColor.white}`
            );

            await Popular.findOneAndUpdate(
                { _id: 1 },
                { forWeek: weekNow, items: listToSend },
                { new: true }
            );
        } else {
            // Returnera befintliga rätter om veckonummret är detsamma
            listToSend = storedPopularObj.items;

            console.log(
                `${textColor.cyan}**** POPULAR DISHES: Returning current dishes... ${textColor.white}`
            );
        }

        // Skicka listToSend som svar
        res.send(listToSend);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

/** ENDAST HJÄLPFUNKTIONER NEDAN */

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
	while (weeklyDishes.length < 5) {
		for (let i = 0; i < 5; i++) {
			let dish = meals[randomizer(0, meals.length - 1)];
			!weeklyDishes.includes(dish) && weeklyDishes.push(dish);
		}
	}
    return weeklyDishes;
}


export default router;
