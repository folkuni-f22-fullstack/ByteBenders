import express from 'express';
import dotenv from 'dotenv';
import Order from '../models/Orders.js';
import { connectDb } from '../db.js';
import { connect } from 'mongoose';

const router = express.Router();
router.use(express.json());


// [PUT] :id
router.put('/:id', async (req, res) => {
	try {
		await connectDb();
		const orderId = req.params.id;
		const updatedOrderData = req.body; // Utgår från att datan ligger i req.body tillsvidare
		// const updatedStatus = req.body.status

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




// const orderSchema = new mongoose.Schema({
//     orderId: Number,
//     date: { type: Date, default: Date.now() },
//     content: Array,
//     usercomment: String,
//     staffcomment: String,
//     total: Number,
//     status: String,
//     locked: Boolean
// })