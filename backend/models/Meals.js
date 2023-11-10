import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    image: String,
    _id: Number,
    name: String,
    price: Number,
    description: String,
    category: String,
    subcategory: [], // Om du vill ha flera underkategorier som strängar
    allergenes: [], // Om allergener är strängar
    comment: String
})

const Meal = mongoose.model('Meal', mealSchema)
export default Meal