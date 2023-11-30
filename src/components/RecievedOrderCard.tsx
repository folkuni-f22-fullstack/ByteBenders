import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/loginState.js';
import '../styles/OrderCards.css';
import '../App.css';
import { Order } from '../interfaces/order';
import { getOrders } from '../utils/fetch';
import OrderCard from './OrderCard.js';

export default function RecievedOrderCard({ change, setChange }) {
	const [orderData, setOrderData] = useState<Order[] | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState);

	useEffect(() => {
		async function fetchOrderID() {
			try {
				const fetchedData = await getOrders(isLoggedIn.token);
				const receivedOrders = fetchedData?.filter(
					(order) => order.status === 'received'
				);
				setOrderData(receivedOrders);
			} catch (error) {
				console.log('Failed to fetch received orders');
			}
		}
		fetchOrderID();
	}, [change]);

	if (orderData === null) {
		return (
			<section className='loading-container'>
				<div className='loading-order'>Loading...</div>
			</section>
		);
	}

	return (
		<section className='recieved-order-container'>
			{orderData &&
				orderData.map((order) => (
					<OrderCard
						key={order.orderId}
						order={order}
						page='received'
						setOrderData={setOrderData}
						change={change}
						setChange={setChange}
					/>
				))}
		</section>
	);
}
