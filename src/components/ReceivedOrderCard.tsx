import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/loginState.js';
import '../styles/OrderCards.css';
import '../App.css';
import { Order } from '../interfaces/order.js';
import { getOrders } from '../utils/fetch.js';
import OrderCard from './OrderCard.js';
import { OrderCompProps } from '../interfaces/OrderCardProps.js';
import { loginStateType } from '../interfaces/loginStateType.js';
import { useNavigate } from 'react-router-dom';

const ReceivedOrderCard: React.FC<OrderCompProps> = ({ change, setChange }) => {
	const [orderData, setOrderData] = useState<Order[] | null>(null);
	const [isLoggedIn, setIsLoggedIn] =
		useRecoilState<loginStateType>(loginState);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchOrderID() {
			try {
				if (!isLoggedIn.loggedIn) {
					// User is not logged in, no fetch
					return;
				}
				const fetchedData = await getOrders(isLoggedIn.token);
				const receivedOrders = fetchedData?.filter(
					(order: Order) => order.status === 'received'
				);
				setOrderData(receivedOrders);
			} catch (error) {
				console.log('Failed to fetch received orders');
			}
		}
		fetchOrderID();
	}, [change, isLoggedIn]);

	if (!isLoggedIn.loggedIn) {
		// Redirect to error page
		navigate('/error');
		return;
	}

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
};

export default ReceivedOrderCard;
