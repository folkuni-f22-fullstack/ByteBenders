import express from 'express';
import Order from '../models/Orders.js';
import { connectDb } from '../db.js';

const router = express.Router();
router.use(express.json());

let textColor = {
    yellow: "\x1b[33m",
    white: "\x1b[37m",
    cyan: "\x1b[36m",
	green: "\x1b[32m",
	red: "\x1b[31m"
};

// [GET]
router.get('/:id', async (req, res) => {
	await connectDb();
    try {
        const orderId = req.params.id;
        console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Searching for order ${orderId}...`);
        const order = await Order.findOne({ orderId: orderId });
        console.log(`[SUCCESS] Found order ${orderId}!`);
        res.send(order).status(200);
    } catch (error) {
        console.log(`${textColor.red}[ERROR]${textColor.white}: `, error.message);
        res.sendStatus(404);
    }
});

// [DELETE]
router.delete('/:id', async (req, res) => {
	await connectDb();
    try {
        const orderId = req.params.id;
        console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Deleting order with ID:`, orderId);
        const order = await Order.deleteOne({ orderId: orderId });
        console.log(`${textColor.green}[SUCCESS]${textColor.white} Order deleted successfully! `, order);
        res.sendStatus(200);
    } catch (error) {
        console.log(`${textColor.red}[ERROR]${textColor.white}: `, error.message);
        res.sendStatus(404);
    }
});

export default router;
