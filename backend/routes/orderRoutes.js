import express from "express";
import dotenv from 'dotenv'
import Order from "../models/Orders.js";
import { connectDb } from "./db.js"
import { connect } from "mongoose";

const router = express.Router()
router.use(express.json())

// [GET] all
router.get('/', async (req, res) => {
    await connectDb()
    try {
        let orders = await Order.find()
        console.log(orders)
        res.send(orders)
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
})


// [GET] :id
router.get('/:id', async (req, res) => {
    await connectDb()
    try {
        let foundOrder = await Order.findOne({ _id: req.params.id })
        if (foundOrder !== undefined) {
            console.log('Order Found', foundOrder);
            res.status(302).send(foundOrder)
        } else {
            console.log('Could not find order...aborting');
            res.sendStatus(404)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
})

// [DELETE] 
router.delete('/:id', async (req, res) => {
    try {
        await connectDb()
        const order = await Order.deleteOne({ _id: req.params.id })
        console.log(order);
        res.sendStatus(200)
    } catch (error) {
        console.log(error.message);
        res.sendStatus(404)
    }
})







// const newOrder = new Order({
//     _id: 2,
//     // date: { type: Date, default: Date.now() },
//     content: ['Sushi Platter', 'Miso Soup'],
//     usercomment: ' ',
//     staffcomment: ' ',
//     total: 50,
//     done: true
// });

// await connectDb()
// try {
//     await newOrder.save()
// } catch (error) {
//     console.log('Order kunde inte pushas', error)
// }
export default router