import { useParams } from "react-router-dom";
import { Dish } from "../interfaces/dish";
import { Order } from "../interfaces/order";
import { promo, totalPrice } from "../components/CartCard";
import { randomizer } from "./general";

export function getMealsID() {
  const { id } = useParams();
  const getMealsUrl = `/api/meals/${id}`;

  async function getMeals(): Promise<Dish[]> {
    try {
      const response = await fetch(getMealsUrl);
      const detailsData = await response.json();

      return detailsData;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong while fetching meal details");
    }
  }
  return getMeals();
}

export async function getOrders(token) {
  const getOrdersUrl = `/api/orders`;

  const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    } 
  }

  try {
    const response = await fetch(getOrdersUrl, options);
    const orderData = await response.json();
    return orderData;

  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching meal details");
  }
}

export async function putOrder(order: Order, newStatus: string, token) {
  const putOrderUrl = `/api/orders/${order.orderId}`;
  order.status = newStatus;

  const options = {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(order),
  };

  try {
    const response = await fetch(putOrderUrl, options);
    const orderData = await response.json();
    return orderData;

  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching meal details");
  }
}

export async function isOrderLocked(id) {
  const getOrdersUrl = `/api/customer/${id}`;

  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(getOrdersUrl, options);
    const orderData = await response.json();
    // console.log(`is order#${id} locked? : `, orderData.locked);
    return orderData.locked;

  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching meal details");
  }
}

export async function postOrder(customerInfo) {
  const postOrderUrl = "/api/orders";
  const cartData = localStorage.getItem("cart");

  const randomId = Math.floor(Math.random() * 100000);
  localStorage.setItem("orderNumber", JSON.stringify(randomId));

  if (!cartData) {
    console.log("Finns ingen orderData i local storage");
    return;
  }

  try {
    const parsedCartData = JSON.parse(cartData);

    // Extract all usercomments
    const allUserComments = parsedCartData.map(
      (comment) => comment.usercomment
    );
    const combineAllUserComments = allUserComments.join(". ");

    // Omstrukturera parsedCartData efter vad din backend förväntar sig
    const formattedOrderData = {
      orderId: randomId,
      customername: customerInfo.customerName,
      customermail: customerInfo.customerMail,
      content: parsedCartData,
      usercomment: combineAllUserComments || "",
      // staffcomment: parsedCartData.staffcomment || "",
      total: promo.value !== 0 ? promo.value : totalPrice.value,
      status: "received",
      locked: parsedCartData.locked || false,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedOrderData),
    };

    const response = await fetch(postOrderUrl, options);

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const responseData = await response.json();

    // Ta bort orderdatan från local storage efter att beställningen har skickats
    localStorage.removeItem("cart");
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while posting order");
  }
}

export async function updateLockedOrder(order: object, type: string, value: string | number) {
  const baseUrl = `/api/editorder/${order.orderId}`;

  let body = {
    orderId: order.orderId,
    staffcomment: type === 'comment' ? value : order.staffcomment,
    total: type === 'total' ? Number(value) : order.total,
  };

  try {  
      const options = {
          method: 'PUT',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
      };

      let response = await fetch(baseUrl, options);
      const data = await response.json();
      return response;

  } catch (error) {
      console.log( 'error.message: ', error.message);
      return error.message
  }
}