import express from 'express';
import Order from '../models/Orders.js';
import { connectDb } from '../db.js';
import History from '../models/doneOrders.js';
import { authenticateToken } from '../utils/authentication.js';

const router = express.Router();
router.use(express.json());

let textColor = {
    yellow: "\x1b[33m",
    white: "\x1b[37m",
    cyan: "\x1b[36m",
	green: "\x1b[32m",
	red: "\x1b[31m"
};

// [GET] all
router.get('/', authenticateToken, async (req, res) => {
	await connectDb();
	try {
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Searching for orders...`);
		let orders = await Order.find();
		console.log(`${textColor.green}[SUCCESS]${textColor.white} Found and returned ${orders.length} orders.`);
		res.send(orders);
	} catch (error) {
		console.log(`${textColor.red}[ERROR]${textColor.white}: `, error);
		res.sendStatus(400);
	}
});

// [GET] :id
router.get('/:id', authenticateToken, async (req, res) => {
	await connectDb();

	try {
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Finding order...`, foundOrder);
		let foundOrder = await Order.findOne({ _id: req.params.orderid });
		if (foundOrder !== undefined) {
			console.log(`${textColor.green}[SUCCESS]${textColor.white} Order found: `, foundOrder);
			res.status(302).send(foundOrder);
		} else {
			console.log(`${textColor.red}[FAIL]${textColor.white} Could not find order... Aborting.`);
			res.sendStatus(404);
		}
	} catch (error) {
		console.log(`${textColor.red}[ERROR]${textColor.white}: `, error);
		res.sendStatus(400);
	}
});

// [DELETE]
router.delete('/:id', authenticateToken, async (req, res) => {
	try {
		await connectDb();
		const orderId = req.params.id;
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Deletion of order #` + orderId);
		const order = await Order.deleteOne({ orderId: orderId });
		console.log(`${textColor.green}[SUCCESS]${textColor.white} Deleted ` + orderId + '!');
		res.sendStatus(200);
	} catch (error) {
		console.log(`${textColor.red}[ERROR]${textColor.white}: `, error.message);
		res.sendStatus(404);
	}
});

// [POST]
router.post('/', async (req, res) => {
	try {
		await connectDb();
		const newOrderData = req.body;

		let maybeOrder = new Order({
			orderId: newOrderData.orderId,
			date: newOrderData.date,
			customername: newOrderData.customername,
			customermail: newOrderData.customermail,
			content: newOrderData.content,
			usercomment: newOrderData.usercomment,
			staffcomment: newOrderData.staffcomment,
			total: newOrderData.total,
			status: newOrderData.status,
			locked: newOrderData.locked,
		});
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} POST of order ${maybeOrder.orderId}`);
		await maybeOrder.save();
		console.log(`${textColor.green}[SUCCESS]${textColor.white} POST of order ${maybeOrder.orderId}`);
		res.sendStatus(200);
		return
	} catch (error) {
		console.log(`${textColor.red}[ERROR]${textColor.white}: `, error.message);
		res.sendStatus(400);
	}
});

// [PUT] :id
router.put('/:id', authenticateToken, async (req, res) => {
	try {
		await connectDb();
		const orderId = req.params.id;
		const updatedStatus = req.body.status;

		// Kolla om någon order matchar sökid
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Find order ${orderId}`);
		const existingOrder = await Order.findOne({ orderId: orderId });
		if (!existingOrder) {
			console.log(`[FAIL] Order ${orderId} not found!`);
			return res.sendStatus(404);
		}

		const updatedOrder = await Order.findOneAndUpdate(
			{ orderId: orderId },
			{ locked: true, status: updatedStatus },
			{ new: true }
		);

		console.log(`${textColor.green}[SUCCESS]${textColor.white} - Status updated`);
		res.status(200).send(updatedOrder);
	} catch (error) {
		console.log(`${textColor.red}[ERROR]${textColor.white}: `, error.message);
		res.sendStatus(400);
	}
});

// [POST]
router.post('/done', async (req, res) => {
	try {
		await connectDb();
		const doneOrderData = req.body;

		let maybeDoneOrder = new History({
			orderId: doneOrderData.orderId,
			content: doneOrderData.content,
			usercomment: doneOrderData.usercomment,
			staffcomment: doneOrderData.staffcomment,
			total: doneOrderData.total,
			status: doneOrderData.status,
			locked: doneOrderData.locked,
		});
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Saving order to 'Histories'-collection...`);
		await maybeDoneOrder.save();
		console.log(`${textColor.green}[SUCCESS]${textColor.white} Saved order to 'Histories'-collection!`);
		
		console.log(`${textColor.yellow}[ATTEMPTING]${textColor.white} Deleting order from 'Orders'-collection...`);
		await Order.deleteOne({ orderId: maybeDoneOrder.orderId });
		console.log(`${textColor.green}[SUCCESS]${textColor.white} Deleted order from 'Orders'-collection!`);

		res.status(200).send(maybeDoneOrder);
	} catch (error) {
		console.log(`${textColor.red}[ERROR]${textColor.white}: `, error.message);
		res.sendStatus(404);
	}
});

export default router;
