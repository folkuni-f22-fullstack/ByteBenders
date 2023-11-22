import express from 'express';
import Order from '../models/Orders.js';
import { connectDb } from '../db.js';

const router = express.Router();
router.use(express.json());

// [GET]
router.get('/:id', async (req, res) => {
	await connectDb();
    try {
        const orderId = req.params.id;
        const order = await Order.findOne({ orderId: orderId });
        res.send(order).status(200);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(404);
    }
});

// [DELETE]
router.delete('/:id', async (req, res) => {
	await connectDb();
    try {
        const orderId = req.params.id;
        console.log('Deleting order with ID:', orderId);
        const order = await Order.deleteOne({ orderId: orderId });
        console.log('Order deletion result:', order);
        res.sendStatus(200);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(404);
    }
});

export default router;
