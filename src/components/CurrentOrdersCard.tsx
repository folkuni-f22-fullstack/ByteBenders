import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/loginState.js';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
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
	const [isExpanded, setIsExpanded] = useState<null | number>(null);
	const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState);
	const [priceChange, setPriceChange] = useState({});
	const [commentChange, setCommentChange] = useState({});
	const [discountChange, setDiscountChange] = useState({});

	const totalInput = useRef(null);
	const commentInput = useRef(null);
	const discountInput = useRef(null);

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

	const handleDeleteOrder = async (orderId: number, token) => {
		try {
			deleteOrder(orderId, token);
		} catch (error) {
			console.log('ERROR: ', error);
		}
		const updatedOrders = await getOrders(token);
		setOrderData(updatedOrders);
	};

	// Handle new staff comment
	function handleCommentChange(
		orderId: number,
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const newComment = String(event.target.value);
		setCommentChange((prev) => ({ ...prev, [orderId]: newComment }));
	}

	// Handle new price
	function handlePriceChange(
		orderId: number,
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const newTotal = event.target.value;
		setPriceChange((prev) => ({ ...prev, [orderId]: newTotal }));
	}

	// Handle discount
	function handleDiscountChange(
		orderId: number,
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const newDiscount = Number(event.target.value);
		setDiscountChange((prev) => ({ ...prev, [orderId]: newDiscount }));
	}

	// Calculate discount
	async function calculateNewPrice(order, percentage) {
		const newPrice = Math.round(
			order.total - (order.total / 100) * percentage
		);
		await sendChange(order, 'total', newPrice);
	}

	async function sendChange(order, type, change) {
		if (change === null || change === undefined) {
			return;
		}

		try {
			await updateLockedOrder(order, type, change);
		} catch (error) {
			console.log(error);
		}

		setChange((prevChange) => prevChange + 1);
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
}
