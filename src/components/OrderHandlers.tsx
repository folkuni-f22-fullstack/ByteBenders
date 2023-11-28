import { RiCheckboxCircleLine } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { BsFillArrowRightCircleFill, BsCheckCircleFill } from 'react-icons/bs';
import { getOrders } from '../utils/fetch';
import { putOrder } from '../utils/fetch';
import { loginState } from '../recoil/loginState.js';
import { useRecoilState } from 'recoil';
import { Order } from '../interfaces/order';
import { postDoneOrder } from '../utils/fetch';
import { deleteOrder } from '../utils/AJAX/deleteOrders.ts';

type OrderHandlerProps = {
	page: string;
	order: Order;
	setOrderData: React.Dispatch<React.SetStateAction<Order[] | null>>;
	change: number;
	setChange: (value: number) => void;
};

const OrderHandlers: React.FC<OrderHandlerProps> = ({
	page,
	order,
	setOrderData,
	change,
	setChange,
}) => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState);

	const handleToggleStatus = async (order: Order, newStatus: string) => {
		try {
			// Update the "status" property in the database
			await putOrder(order, newStatus, isLoggedIn.token);

			// Refetch orders after updating the "status"
			const updatedOrders = await getOrders(isLoggedIn.token);
			setOrderData(updatedOrders);
			setChange((change) => change + 1);
			console.log('Order updated');
		} catch (error) {
			console.log('Failed to update order status');
		}
	};

	const handleOrderDone = async (order: Order) => {
		try {
			await postDoneOrder(order);
			//Skapar en ny array med ordrar, minus den som klickas på.
			setOrderData((prevOrderData: Order[] | null) =>
				prevOrderData
					? prevOrderData.filter((o) => o.orderId !== order.orderId)
					: null
			);
			setChange((change) => change + 1);
		} catch (error) {
			console.log('Failed to mark order as done', error);
		}
	};

	const handleDeleteOrder = async (orderId: number, token: string) => {
		try {
			deleteOrder(orderId, token);
		} catch (error) {
			console.log('ERROR: ', error);
		}
		const updatedOrders = await getOrders(token);
		setOrderData(updatedOrders);
	};

	return (
		<section className='bottom-handlers-section'>
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
		</section>
	);
};

export default OrderHandlers;
