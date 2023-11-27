import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    image: String,
    _id: Number,
    name: String,
    price: Number,
    description: String,
    category: String,
    subcategory: [],
    allergenes: [], 
    comment: String
})

const Meal = mongoose.model('Meal', mealSchema)
export default Meal