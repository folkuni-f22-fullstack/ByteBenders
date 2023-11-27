import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: Number,
    date: { type: Date, default: Date.now() },
    customername: String,
    customermail: String,
    content: Array,
    usercomment: String,
    staffcomment: String,
    total: Number,
    status: String,
    locked: Boolean
})

const Order = mongoose.model('Order', orderSchema)
export default Order