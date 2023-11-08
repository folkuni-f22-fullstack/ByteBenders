import { signal } from "@preact/signals-react";
import menuData from "../data/menu.json";

export let quantity = signal(1)
// Send to local storage
function addToLS(id) {
  const product = menuData.find((product) => product.id == id)
  const cartItem = {
    id: product.id,
    image: product.image,
    name: product.name,
    price: product.price * quantity,
    quantity: quantity,
    comment: product.comment,
  };
  const existingCartData = JSON.parse(localStorage.getItem("cart")) || []

  // Check if the item already exists and add item
  const matchingId = existingCartData.findIndex((item) => item.id === cartItem.id)
  if (matchingId !== -1) {
    existingCartData[matchingId].quantity += cartItem.quantity
    existingCartData[matchingId].price += cartItem.price
  } else {
    existingCartData.push(cartItem)
  }
  localStorage.setItem("cart", JSON.stringify(existingCartData))
}

export default addToLS
