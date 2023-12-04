import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import '../styles/OrderCards.css';
import '../App.css';
import { Order } from '../interfaces/order';
import { getOrders } from '../utils/fetch';
import { loginState } from '../recoil/loginState.js';
import OrderCard from './OrderCard.js';
import { loginStateType } from '../interfaces/loginStateType.js';
import { OrderCompProps } from '../interfaces/OrderCardProps.js';

const DoneOrderCard: React.FC<OrderCompProps> = ({ change, setChange }) => {
	const [orderData, setOrderData] = useState<Order[] | null>(null);
	const [isLoggedIn, setIsLoggedIn] =
		useRecoilState<loginStateType>(loginState);

	useEffect(() => {
		async function fetchOrderID() {
			try {
				const fetchedData = await getOrders(isLoggedIn.token);
				const doneOrders = fetchedData?.filter(
					(order: Order) => order.status === 'done'
				);
				setOrderData(doneOrders);
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
						page='done'
						setOrderData={setOrderData}
						change={change}
						setChange={setChange}
					/>
				))}
		</section>
	);
};

export default DoneOrderCard;
