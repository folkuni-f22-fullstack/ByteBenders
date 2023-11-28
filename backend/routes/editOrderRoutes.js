import express from 'express';
import Order from '../models/Orders.js';
import { connectDb } from '../db.js';

const router = express.Router();
router.use(express.json());


// [PUT] :id
router.put('/:id', async (req, res) => {
	try {
		await connectDb();
		const orderId = req.params.id;
		const updatedOrderData = req.body;

		// Kolla om någon order matchar sökid
		const existingOrder = await Order.findOne({orderId: orderId});
		if (!existingOrder) {
			console.log('Order not found');
			return res.sendStatus(404);
		}

		const updatedOrder = await Order.findOneAndUpdate(
			{ orderId: orderId },
			{ 
				orderId: updatedOrderData.orderId,
				staffcomment: updatedOrderData.staffcomment,
				total: updatedOrderData.total,
			},
			{ new: true }
		);
		
		console.log('Status uppdaterad');
		res.status(200).send(updatedOrder)
	} catch (error) {
		console.error(error.message);
		res.sendStatus(400);
	}
});


export default router;