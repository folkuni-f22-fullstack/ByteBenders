import { signal } from '@preact/signals-react';
import { postOrder } from '../utils/fetch.tsx';
import { useRecoilState } from 'recoil';
import { isCartEmptyState } from '../recoil/cartNumberState.js';
import { orderState } from '../recoil/orderState.js';
import { OrderStateType } from '../interfaces/order.ts';
import * as React from 'react';

export let orderNumber = signal<number | null>(null);
export let isOrdered = signal<boolean>(false);
function SendCartData({
	customerNameRef,
	customerMailRef,
	customerCommentRef,
	setIsNameValid,
	setIsMailValid,
	setIsComment,
}): JSX.Element {
	const [isCartEmpty, setIsCartEmpty] = useRecoilState(isCartEmptyState);
	const [currentOrder, setCurrentOrder] =
		useRecoilState<OrderStateType>(orderState);

	function handlePost() {
		let cart: any[] = [];
		const cartItem = localStorage.getItem('cart');

		if (cartItem && typeof cartItem === 'string') {
			cart = JSON.parse(cartItem);
		}

		// let cart: any[] = JSON.parse(localStorage.getItem("cart")) || "[]";
		const isMailRegexOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
			customerMailRef.current.value
		);
		const isNameRegexOk = /^[a-zA-ZåäöÅÄÖ\- ]+$/.test(
			customerNameRef.current.value
		);

		// For error styling
		isMailRegexOk ? setIsMailValid(true) : setIsMailValid(false);
		isNameRegexOk ? setIsNameValid(true) : setIsNameValid(false);

		// For function gate keeping
		if (cart.length <= 0) {
			return;
		}
		if (!isMailRegexOk || !isNameRegexOk) {
			return;
		}

		const customerInfo = {
			customerName: customerNameRef.current.value,
			customerMail: customerMailRef.current.value,
			customerComment: customerCommentRef.current.value,
		};

		postOrder(customerInfo);

		const orderNumberValue = localStorage.getItem('orderNumber');

		if (orderNumberValue !== null && orderNumberValue !== undefined) {
			setCurrentOrder({
				isOrdered: true,
				isWaiting: true,
				orderNumber: orderNumberValue,
			});

			setIsCartEmpty(!isCartEmpty);
			setIsNameValid(true);
			setIsMailValid(true);
			setIsComment(true);
			customerMailRef.current.value = '';
			customerNameRef.current.value = '';
			customerCommentRef.current.value = '';
		}
	}

	return (
		<button className='send-cart-button' onClick={handlePost}>
			Checkout
		</button>
	);
}

export default SendCartData;
