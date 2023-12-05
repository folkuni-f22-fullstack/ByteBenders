import React, { useEffect, useState, useRef } from 'react';
import '../styles/statusorder.css';
import { useNavigate } from 'react-router-dom';
import { BiSolidTimer } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { getSpecificOrder } from '../utils/fetch.js';
import { finishedTime } from '../utils/orderstatus.js';
import { checkIfDishIsFinished } from '../utils/orderstatus.js';
import { orderState } from '../recoil/orderState.js';
import { useRecoilState } from 'recoil';
import axios from 'axios';

export default function OrderStatusCustomer() {
	const [count, setCount] = useState<number>(15);
	const [currentOrder, setCurrentOrder] = useRecoilState(orderState);
	const navigate = useNavigate();

	const orderText = useRef<HTMLParagraphElement>(null);
	const eraseButton = useRef<HTMLButtonElement>(null);
	const resetButton = useRef<HTMLButtonElement>(null);
	const intervalRef = useRef<number | NodeJS.Timeout | null>(null);
	const ETAtext = useRef<HTMLHeadingElement>(null);

	// Checks on mount if order exists
	useEffect(() => {
		checkIfDishIsFinished(count, setCurrentOrder);
	}, []);

	// Checks at 5-second intervals if the estimated time of arrival (ETA) has elapsed; if it has, it sets the waiting state to false.
	useEffect(() => {
		intervalRef.current = setInterval(() => {
			checkIfDishIsFinished(count, setCurrentOrder);
			if (!currentOrder.isWaiting) {
				clearInterval(intervalRef.current! as NodeJS.Timeout);
			}
		}, 2000);
		return () => clearInterval(intervalRef.current! as NodeJS.Timeout);
	}, [count, currentOrder.isWaiting]);

	// "Place new order" button
	function handleClick() {
		localStorage.removeItem('orderNumber');
		localStorage.removeItem('ETA');
		localStorage.removeItem('cart');
		localStorage.removeItem('promo-code');
		setCurrentOrder({
			isOrdered: false,
			isWaiting: false,
			orderNumber: '',
		});
	}

	// "Edit my order" button
	async function attemptErase(orderId: string) {
		// orderId from LS, hence parse
		orderId = JSON.parse(orderId);

		try {
			const response = await getSpecificOrder(orderId);

			if (response === true) {
				orderText.current!.innerText =
					'Sorry, the order is already being made..';
			} else {
				orderText.current!.innerText = 'You can now edit your order.';
				eraseButton.current!.style.visibility = 'hidden';
				ETAtext.current!.style.visibility = 'hidden';

				setTimeout(() => {
					setCurrentOrder({
						isOrdered: false,
						isWaiting: false,
						orderNumber: '',
					});

					// Delete from LS
					localStorage.removeItem('orderNumber');
					localStorage.removeItem('ETA');

					// Delete from database
					axios
						.delete(`/api/customer/${orderId}`)
						.then((response) => {})
						.catch((error) => {});
				}, 3000);
			}
		} catch (error) {
			orderText.current!.innerText =
				'The order was not found for some reason. Call us at 070-432 56 01';
			resetButton.current!.style.display = 'block';
			eraseButton.current!.style.display = 'none';
		}
	}

	function handleOrderReset() {
		localStorage.clear();
		navigate('/');
	}

	return (
		<div>
			{currentOrder.isOrdered && currentOrder.isWaiting && (
				<div className='CustomerStatusOrder'>
					<div className='order-waiting'>
						<h1>
							Order:{' '}
							<span className='yellow'>
								{currentOrder.orderNumber}
							</span>
						</h1>
						<BiSolidTimer className='orderstatus-icon waiting' />
						<>
							<h3 ref={ETAtext}>
								Estimated done:{' '}
								<span className='yellow'>
									{finishedTime(count)}
								</span>
							</h3>
							<p ref={orderText} className='order-text'>
								Try to edit your order? <br /> (as long as the
								order has not been locked)
							</p>
							<div className='button-container'>
								<button
									className='orange-button'
									style={{ display: 'block' }}
									ref={eraseButton}
									onClick={() =>
										attemptErase(currentOrder.orderNumber)
									}
								>
									Edit order
								</button>
								<button
									className='orange-button'
									ref={resetButton}
									onClick={handleOrderReset}
									style={{ display: 'none' }}
								>
									{' '}
									Start over{' '}
								</button>
							</div>
						</>
					</div>
				</div>
			)}
			{currentOrder.isOrdered && !currentOrder.isWaiting && (
				<div className='CustomerStatusOrder'>
					<div className='order-finished'>
						<h1>
							Order:{' '}
							<span className='yellow'>
								{currentOrder.orderNumber}
							</span>
						</h1>
						<AiOutlineCheckCircle className='orderstatus-icon finished' />
						<>
							<h3> Enjoy your meal </h3>
							<NavLink to='/'>
								<button
									className='orange-button'
									onClick={handleClick}
								>
									{' '}
									Place new order{' '}
								</button>
							</NavLink>
						</>
					</div>
				</div>
			)}
		</div>
	);
}
