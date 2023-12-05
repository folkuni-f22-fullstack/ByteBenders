import { RiCheckboxCircleLine } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { BsFillArrowRightCircleFill, BsCheckCircleFill } from 'react-icons/bs';
import { putOrder } from '../utils/fetch';
import { loginState } from '../recoil/loginState.js';
import { useRecoilState } from 'recoil';
import { Order } from '../interfaces/order';
import { postDoneOrder } from '../utils/fetch';
import { deleteOrder } from '../utils/AJAX/deleteOrder.ts';
import React from 'react';
import { loginStateType } from '../interfaces/loginStateType.ts';
import { OrderHandlerProps } from '../interfaces/OrderCardProps.ts';

const OrderHandlers: React.FC<OrderHandlerProps> = ({
	page,
	order,
	setOrderData,
	change,
	setChange,
}) => {
	const [isLoggedIn, setIsLoggedIn] =
		useRecoilState<loginStateType>(loginState);

	const handleToggleStatus = async (order: Order, newStatus: string) => {
		try {
			// Update the "status" property in the database
			await putOrder(order, newStatus, isLoggedIn.token);

			setChange((change) => change + 1);
		} catch (error) {
			console.log('Failed to mark order as current', error);
		}
	};

	const handleOrderDone = async (order: Order) => {
		try {
			await postDoneOrder(order);
			// Creates new array of orders, minus the one clicked on.
			setOrderData((prevOrderData: Order[] | null) =>
				prevOrderData
					? prevOrderData.filter((o) => o.orderId !== order.orderId)
					: null
			);
		} catch (error) {
			console.log('Failed to mark order as done', error);
		}
	};

	const handleDeleteOrder = async (orderId: number, token: string) => {
		try {
			deleteOrder(orderId, token);
		} catch (error) {
			console.log('Failed to delete order: ', error);
		}

		setChange((change) => change + 1);
	};

	return (
		<>
			{/* SEND ORDER START */}
			{page === 'received' ? (
				<>
					<button
						className='send-order-icon'
						onClick={() => handleToggleStatus(order, 'current')}
					>
						{' '}
						<BsFillArrowRightCircleFill />
					</button>
					{!order.locked && (
						<button
							className='delete-order-icon'
							onClick={async () =>
								await handleDeleteOrder(
									order.orderId,
									isLoggedIn.token
								)
							}
						>
							<MdDeleteForever />
						</button>
					)}
				</>
			) : page === 'current' ? (
				<>
					<button
						className='send-order-icon'
						onClick={() => handleToggleStatus(order, 'done')}
					>
						<BsCheckCircleFill />
					</button>
					{/* SEND ORDER END */}

					{/* DELETE ORDER START */}
					<button
						className='delete-order-icon'
						onClick={async () =>
							await handleDeleteOrder(
								order.orderId,
								isLoggedIn.token
							)
						}
					>
						<MdDeleteForever />
					</button>
					{/* DELETE ORDER END */}
				</>
			) : (
				<div
					className='send-order-icon'
					onClick={() => handleOrderDone(order)}
				>
					<RiCheckboxCircleLine />
				</div>
			)}
		</>
	);
};

export default OrderHandlers;
