import mongoose from "mongoose";

const popularSchema = new mongoose.Schema({
    _id: Number,
    items: Array,
    forWeek: Number
})

const Popular = mongoose.model('Popular', popularSchema)
export default Popular