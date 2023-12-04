import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/loginState.js';
import '../styles/OrderCards.css';
import '../App.css';
import { Order } from '../interfaces/order';
import { getOrders } from '../utils/fetch';
import OrderCard from './OrderCard.tsx';
import { loginStateType } from '../interfaces/loginStateType.ts';
import { OrderCompProps } from '../interfaces/OrderCardProps.ts';

const CurrentOrderCard: React.FC<OrderCompProps> = ({ change, setChange }) => {
	const [orderData, setOrderData] = useState<Order[] | null>(null);
	const [isLoggedIn, setIsLoggedIn] =
		useRecoilState<loginStateType>(loginState);

	useEffect(() => {
		async function fetchOrderID() {
			try {
				const fetchedData = await getOrders(isLoggedIn.token);
				const currentOrders = fetchedData?.filter(
					(order: Order) => order.status === 'current'
				);
				setOrderData(currentOrders);
			} catch (error) {
				console.log(error);
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
						page='current'
						setOrderData={setOrderData}
						change={change}
						setChange={setChange}
					/>
				))}
		</section>
	);
};

export default CurrentOrderCard;
