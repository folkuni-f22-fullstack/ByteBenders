import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/loginState.js';
import '../styles/OrderCards.css';
import '../App.css';
import { Order } from '../interfaces/order';
import { getOrders } from '../utils/fetch';
import { putOrder } from '../utils/fetch';
import { useRef } from 'react';
import { updateLockedOrder } from '../utils/fetch';
import { deleteOrder } from '../utils/AJAX/deleteOrder.js';
import OrderCard from './OrderCard.tsx';

export default function CurrentOrderCard({ change, setChange }) {
	const [orderData, setOrderData] = useState<Order[] | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState);

	useEffect(() => {
		async function fetchOrderID() {
			try {
				const fetchedData = await getOrders(isLoggedIn.token);
				const currentOrders = fetchedData?.filter(
					(order) => order.status === 'current'
				);
				setOrderData(currentOrders);
			} catch (error) {
				console.log(error);
			}
		}
		fetchOrderID();
	}, [change]);

	if (orderData === null) {
		// Lägg till något laddningsindikator eller annat meddelande medan data hämtas
		return (
			<section className='loading-container'>
				<div className='loading-order'>Loading...</div>
			</section>
		);
	}

	const handleToggleStatus = async (order: Order, newStatus: string) => {
		try {
			// Update the "status" property in the database
			await putOrder(order, newStatus, isLoggedIn.token);

			// Refetch orders after updating the "status"
			const updatedOrders = await getOrders(isLoggedIn.token);
			setOrderData(updatedOrders);
			console.log('Order updated');
		} catch (error) {
			console.log('Failed to update order status');
		}
	};

	return (
		<section className='recieved-order-container'>
			{orderData &&
				orderData.map((order) => (
					<OrderCard
						key={order.orderId}
						order={order}
						page='current'
						setOrderData={setOrderData}
						change={change}
						setChange={setChange}
					/>
				))}
		</section>
	);
}
