import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/loginState.js';
import '../styles/OrderCards.css';
import '../App.css';
import { Order } from '../interfaces/order';
import { getOrders } from '../utils/fetch';
import OrderCard from './OrderCard.tsx';

export default function CurrentOrderCard({ change, setChange }) {
	const [orderData, setOrderData] = useState<Order[] | null>(null);
	const [isExpanded, setIsExpanded] = useState<null | number>(null);
	const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState);

	useEffect(() => {
		async function fetchOrderID() {
			try {
				const fetchedData = await getOrders(isLoggedIn.token);
				const currentOrders = fetchedData?.filter(
					(order) => order.status === 'current'
				);
				setOrderData(currentOrders);
				console.log('Succeeded in fetching current orders');
			} catch (error) {
				console.log('Failed to fetch current orders');
			}
		}
		fetchOrderID();
	}, [change]);

	if (orderData === null) {
		// Lägg till något laddningsindikator eller annat meddelande medan data hämtas
		return <div>Loading...</div>;
	}

	console.log('orderData är: ', orderData);

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
