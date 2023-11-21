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

      // Log the response here
      // console.log('Meal API Response:', detailsData);
      return detailsData;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong while fetching meal details");
    }
  }
  return getMeals();
}

export async function getOrders() {
  // const { orderid } = useParams()
  const getOrdersUrl = `/api/orders`;

  // async function getOrders(): Promise<Order[]> {
  try {
    const response = await fetch(getOrdersUrl);
    const orderData = await response.json();

    // console.log('Order API response', orderData);
    return orderData;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching meal details");
  }
  // }
  // return getOrders
}

export async function putOrder(order: Order, newStatus: string) {
  // const { orderid } = useParams()
  const putOrderUrl = `/api/orders/${order._id}`;

  // body = {
  // 	// _id: id,
  // 	status: newStatus
  // }
  console.log("orderstatus innan", order.status);

  order.status = newStatus;
  console.log("orderstatus efter", order.status);

  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  };

  try {
    const response = await fetch(putOrderUrl, options);
    const orderData = await response.json();

    console.log("Order API response", orderData);
    return orderData;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching meal details");
  }
}

export async function isOrderLocked(id) {

	const getOrdersUrl = `/api/orders/${id}`

	const options = {
		method: 'GET',
		headers: { "Content-Type": "application/json" }
	}

		try {
			const response = await fetch(getOrdersUrl, options)
			const orderData = await response.json()

			console.log(orderData.locked);
			

			return orderData.locked
		} catch (error) {
			console.log(error);
			throw new Error("Something went wrong while fetching meal details")
		}
}
export async function postOrder() {
  const postOrderUrl = "http://localhost:1523/api/orders";
  const orderData = localStorage.getItem("cart");
  let orderContent = JSON.parse(localStorage.getItem("order"));

  const randomId = generateUniqueId()
  localStorage.setItem('orderNumber', JSON.stringify(randomId))

  if (orderData) {
    try {
      const parsedOrderData = JSON.parse(orderData);
      console.log("orderdata:", orderData);
      console.log('parsedOrderData.content: ', parsedOrderData.content);
 
      //   console.log("Data from localStorage:", parsedOrderData);     

      // Omstrukturera parsedOrderData efter vad din backend förväntar sig
      const formattedOrderData = {
        orderId: randomId,
        content: parsedOrderData ,
        // usercomment: parsedOrderData.usercomment || "",
        // staffcomment: parsedOrderData.staffcomment || "",
        total: promo.value !== 0 ? promo.value : totalPrice.value,
        status: "received",
        locked: parsedOrderData.locked || false,
      };
      console.log("Fortmattedorderdata:", formattedOrderData);
      console.log("parsedorderdata",parsedOrderData);

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedOrderData),
      };

      console.log("Request Headers:", options.headers);
      console.log("Request Body:", options.body);

      const response = await fetch(postOrderUrl, options);

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      console.log("2");
      const responseData = await response.json();
      console.log("Order POST API response", responseData);
      // Ta bort orderdatan från local storage efter att beställningen har skickats
      localStorage.removeItem("cart");
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong while posting order");
    }
  } else {
    console.log("Finns ingen orderData i local storage");
  }
}

// export async function postOrder() {
// 	const postOrderUrl = `/api/orders`;
// 	const orderData = localStorage.getItem("cart");

// 	// if (!orderData) {
// 	// 	try {
// 	// 		console.log("No order data found");
// 	// 	}catch (error){

// 	// 	}
// 	// 	return; // Exit the function if there's no order data
// 	// }

// 	const parsedOrderData = JSON.parse(orderData);

// 	const options = {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(parsedOrderData),
// 	};

// 	try {
// 		await fetch(postOrderUrl, options);

// 		console.log("Order successfully posted");
// 	} catch (error) {
// 		console.error("Error posting order:", error.message);
// 		throw new Error("Something went wrong when sending order from cart");
// 	}
// }

// Call the function to post the order

function generateUniqueId() {
  return parseInt(Date.now() + 1 + Math.random().toString(36).substring(2), 10);
}
