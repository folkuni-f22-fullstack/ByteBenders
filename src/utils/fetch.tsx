import { useParams } from "react-router-dom";
import { Dish } from "../interfaces/dish";
import { Order } from "../interfaces/order";

export function getMealsID() {
	const { id } = useParams();
	const getMealsUrl = `/api/meals/${id}`

	async function getMeals(): Promise<Dish[]> {
		try {
			const response = await fetch(getMealsUrl);
			const detailsData = await response.json();

			// Log the response here
			// console.log('Meal API Response:', detailsData);
			return detailsData;
		} catch (error) {
			console.log(error);
			throw new Error("Something went wrong while fetching meal details")
		}
	}
	return getMeals()
}

// export async function getOrderID() {
// 	const { orderid } = useParams()
// 	const getOrdersUrl = `/api/orders/${orderid}`

	// async function getOrders(): Promise<Order[]> {
		// try {
		// 	const response = await fetch(getOrdersUrl)
		// 	const orderData = await response.json()

		// 	console.log('Order API response', orderData);
		// 	return orderData
		// } catch (error) {
		// 	console.log(error);
		// 	throw new Error("Something went wrong while fetching meal details")
		// }
	// }
	// return getOrders
// }

export async function getOrders() {
	// const { orderid } = useParams()
	const getOrdersUrl = `/api/orders`

	// async function getOrders(): Promise<Order[]> {
		try {
			const response = await fetch(getOrdersUrl)
			const orderData = await response.json()

			console.log('Order API response', orderData);
			return orderData
		} catch (error) {
			console.log(error);
			throw new Error("Something went wrong while fetching meal details")
		}
	// }
	// return getOrders
}

