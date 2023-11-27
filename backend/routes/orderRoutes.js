import express from "express";
import Order from "../models/Orders.js";
import { connectDb } from "../db.js";
import History from "../models/doneOrders.js";
import { authenticateToken } from "../utils/authentication.js";

const router = express.Router();
router.use(express.json());

// [GET] all
router.get("/", authenticateToken, async (req, res) => {
  await connectDb();
  try {
    let orders = await Order.find();
    console.log(orders);
    res.send(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

// [GET] :id
router.get("/:id", authenticateToken, async (req, res) => {
  await connectDb();
  console.log("GET");
  try {
    let foundOrder = await Order.findOne({ _id: req.params.orderid });
    if (foundOrder !== undefined) {
      console.log("Order Found", foundOrder);
      res.status(302).send(foundOrder);
    } else {
      console.log("Could not find order...aborting");
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

// [DELETE]
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await connectDb();
    const orderId = req.params.id;
    console.log("Deleting order with ID:", orderId);
    const order = await Order.deleteOne({ _id: orderId });
    console.log("Order deletion result:", order);
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(404);
  }
});

// [POST]
router.post("/", async (req, res) => {
  try {
    await connectDb();
    const newOrderData = req.body;

    let maybeOrder = new Order({
      orderId: newOrderData.orderId,
      customername: newOrderData.customername,
      customermail: newOrderData.customermail,
      content: newOrderData.content,
      usercomment: newOrderData.usercomment,
      staffcomment: newOrderData.staffcomment,
      total: newOrderData.total,
      status: newOrderData.status,
      locked: newOrderData.locked,
    });
    await maybeOrder.save();
   
    
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400);
  }
});

// [PUT] :id
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    await connectDb();
    const orderId = req.params.id;
    const updatedOrderData = req.body; // Utgår från att datan ligger i req.body tillsvidare
    const updatedStatus = req.body.status;

    // Kolla om någon order matchar sökid
    const existingOrder = await Order.findOne({ orderId: orderId });
    if (!existingOrder) {
      console.log("Order not found");
      return res.sendStatus(404);
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { locked: true, status: updatedStatus },
      { new: true }
    );

    console.log("Status uppdaterad");
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400);
  }
});

// [POST]
router.post("/done", async (req, res) => {
  try {
    await connectDb();
    const doneOrderData = req.body;
    console.log("req.body: ", req.body);

    console.log("newOrderData.content: ", doneOrderData.content);

    let maybeDoneOrder = new History({
      orderId: doneOrderData.orderId,
      content: doneOrderData.content,
      usercomment: doneOrderData.usercomment,
      staffcomment: doneOrderData.staffcomment,
      total: doneOrderData.total,
      status: doneOrderData.status,
      locked: doneOrderData.locked,
    });
    await maybeDoneOrder.save();

    await Order.deleteOne({ orderId: maybeDoneOrder.orderId });

    res.status(200).send(maybeDoneOrder);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(404);
  }
});

export default router;
