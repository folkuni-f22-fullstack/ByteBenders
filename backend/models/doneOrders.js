import mongoose from "mongoose";

const doneOrderSchema = new mongoose.Schema({
  orderId: Number,
  date: { type: Date, default: Date.now() },
  content: Array,
  usercomment: String,
  staffcomment: String,
  total: Number,
  status: String,
  locked: Boolean,
});

const DoneOrder = mongoose.model("History", doneOrderSchema);
export default DoneOrder;
