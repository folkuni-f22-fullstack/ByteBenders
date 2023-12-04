import CartCard from '../components/CartCard.tsx';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { orderState } from '../recoil/orderState.js';

export default function CartRoute() {
	const [currentOrder, setCurrentOrder] = useRecoilState(orderState);

	function checkIfOngoingOrder() {
		const orderNumberLS = localStorage.getItem('orderNumber');
		if (orderNumberLS) {
			setCurrentOrder({
				isOrdered: true,
				isWaiting: true,
				orderNumber: orderNumberLS,
			});
			return true;
		} else {
			setCurrentOrder({
				isOrdered: false,
				isWaiting: false,
				orderNumber: '',
			});
			return false;
		}
	}

	useEffect(() => {
		checkIfOngoingOrder();
	}, []);

	return (
		<div className='Cart'>
			<CartCard />
		</div>
	);
}
