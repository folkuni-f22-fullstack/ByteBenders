import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import '../styles/OrderCards.css';
import '../App.css';
import { Order } from '../interfaces/order';
import { getOrders } from '../utils/fetch';
import { loginState } from '../recoil/loginState.js';
import OrderCard from './OrderCard.js';

export default function DoneOrderCard() {
	const [orderData, setOrderData] = useState<Order[] | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState);

	useEffect(() => {
		async function fetchOrderID() {
			try {
				const fetchedData = await getOrders(isLoggedIn.token);
				const doneOrders = fetchedData?.filter(
					(order) => order.status === 'done'
				);
				setOrderData(doneOrders);
				console.log('Succeeded in fetching done orders');
			} catch (error) {
				console.log('Failed to fetch done orders');
			}
		}
		fetchOrderID();
	}, []);

	if (orderData === null) {
		// Lägg till något laddningsindikator eller annat meddelande medan data hämtas
		return (
			<section className='loading-container'>
				<div className='loading-order'>Loading...</div>
			</section>
		);
	}

	const handleOrderDone = async (order: Order) => {
		try {
			await postDoneOrder(order);
			//Skapar en ny array med ordrar, minus den som klickas på.
			setOrderData((prevOrderData) =>
				prevOrderData
					? prevOrderData.filter((o) => o._id !== order._id)
					: null
			);
		} catch (error) {
			console.log('Failed to mark order as done', error);
		}
	};

	const doneOrders = orderData.filter((order) => order.status === 'done');

	return (
		<section className='recieved-order-container'>
			{orderData &&
				orderData.map((order) => (
					<OrderCard
						key={order.orderId}
						order={order}
						page='done'
						setOrderData={setOrderData}
					/>
				))}
		</section>
	);
}
