import express from "express";
import dotenv from 'dotenv'
import Meal from "../models/Meals.js";
import { connectDb } from "../db.js"

// felmeddelandet: "The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string."
// kommer enbart fram när .env inte finns i samma folder som handlern som körs, fråga david om tips.



const newMeal = new Meal({
    image: 'https://jow.fr/_next/image?url=https%3A%2F%2Fstatic.jow.fr%2F880x880%2Frecipes%2FEQ82JmY4aa4aog.png&w=2560&q=100',
    _id: 1236,
    name: 'MongoTestPlate7',
    price: 110,
    description: 'Description of the dish',
    category: 'Meals',
    subcategory: ['Sushi',],
    allergenes: ['Allergen1'],
    comment: '',
});

await connectDb()
try {
    await newMeal.save()
} catch (error) {
    console.log('Meal kunde inte pushas', error)
}

