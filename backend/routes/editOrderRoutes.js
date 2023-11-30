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


// [PUT] :id
router.put('/:id', async (req, res) => {
	try {
		await connectDb();
		const orderId = req.params.id;
		const updatedOrderData = req.body;

		// Kolla om någon order matchar sökid
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Searching for order #${orderId}`);
		const existingOrder = await Order.findOne({orderId: orderId});
		if (!existingOrder) {
			console.log(`[${textColor.red}[FAIL]${textColor.white} Order not found`);
			return res.sendStatus(404);
		}
		console.log(`${textColor.green}[SUCCESS]${textColor.white} Order ${orderId} found.`);
		
		const updatedOrder = await Order.findOneAndUpdate(
			{ orderId: orderId },
			{ 
				orderId: updatedOrderData.orderId,
				staffcomment: updatedOrderData.staffcomment,
				total: updatedOrderData.total,
			},
			{ new: true }
			);
		console.log(`${textColor.green}[SUCCESS]${textColor.white} Order ${orderId} updated.`);
		
		console.log('Status uppdaterad');
		res.status(200).send(updatedOrder)
	} catch (error) {
		console.log(`${textColor.red}[ERROR]${textColor.white}: `, error.message);
		res.sendStatus(400);
	}
});


export default router;