import { signal } from "@preact/signals-react";
import axios from "axios";

export let quantity = signal(1)
// Send to local storage
async function addToLS(id: number, endpoint: string) {

  try {
    const response = await axios.get("/api/meals")
    const product = await response.data

    const productID = product.find((product) => product._id == id)
    const cartItem = {
      // _id: productID._id,
      image: productID.image,
      content: [],
      usercomment: "",
      staffcomment: "",
      name: productID.name,
      total: productID.price * quantity,
      quantity: quantity,
      comment: productID.comment,
      locked: false,
      status: ""
    };
    const existingCartData = JSON.parse(localStorage.getItem("cart")) || []

    const matchingId = existingCartData.findIndex((item) => item.name === cartItem.name)
    if (matchingId !== -1) {
      existingCartData[matchingId].quantity += cartItem.quantity
      existingCartData[matchingId].total += cartItem.total
    } else {
      existingCartData.push(cartItem)
    }
    localStorage.setItem("cart", JSON.stringify(existingCartData));
  } catch (error) {
    console.log('Error fetching', error)
  }
}
export default addToLS
