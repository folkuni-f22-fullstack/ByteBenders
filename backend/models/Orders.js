import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    _id: Number,
    date: { type: Date, default: Date.now() },
    content: [],
    usercomment: String,
    staffcomment: String,
    total: Number,
    status: String,
})

const Order = mongoose.model('Order', orderSchema)
export default Order