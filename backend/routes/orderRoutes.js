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

// [POST] 
router.post('/', async (req, res) => {
    try {
        await connectDb();

        const newOrderData = req.body; // Utgår från att datan ligger i req.body tillsvidare
        const newOrder = new Order(newOrderData);
        const savedOrder = await newOrder.save();
        console.log('Order created:', savedOrder);
        res.status(201).send(savedOrder);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(400);
    }
});


// [PUT] :id
router.put('/:id', async (req, res) => {
    try {
        await connectDb();
        const orderId = req.params.id;
        const updatedOrderData = req.body; // Utgår från att datan ligger i req.body tillsvidare

        // Kolla om någon order matchar sökid
        const existingOrder = await Order.findById(orderId);
        if (!existingOrder) {
            console.log('Order not found');
            return res.sendStatus(404);
        }
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
        console.log('Order updated:', updatedOrder);
        res.status(200).send(updatedOrder);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(400);
    }
});


export default router