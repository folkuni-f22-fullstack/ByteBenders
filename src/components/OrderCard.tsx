import React, { useState, useRef, useEffect } from 'react';
import { OrderCardProps } from '../interfaces/OrderCardProps';
import { updateLockedOrder } from '../utils/fetch';
import StaffInput from './StaffInput';
import OrderHandlers from './OrderHandlers';
// import { DishInCart } from '../interfaces/dish';
import { Order } from '../interfaces/order';
import ArrowButtons from './ArrowButtons';
import '../styles/OrderCards.css';

const OrderCard: React.FC<OrderCardProps> = ({
	order,
	page,
	setOrderData,
	change,
	setChange,
}) => {
	const [isExpanded, setIsExpanded] = useState<null | number>(null);

	const [priceChange, setPriceChange] = useState<{ [key: number]: number }>(
		{}
	);
	const [commentChange, setCommentChange] = useState<{
		[key: number]: string;
	}>({});
	const [discountChange, setDiscountChange] = useState<{
		[key: number]: number;
	}>({});

	const totalInput = useRef<HTMLInputElement>(null);
	const commentInput = useRef<HTMLInputElement>(null);
	const discountInput = useRef<HTMLInputElement>(null);

	useEffect(() => {}, [change]);

	const PropsListForStaffInput = [
		{
			inputRef: commentInput,
			changeHandler: handleCommentChange,
			clickHandler: sendChange,
			type: 'comment',
			// newValue: commentChange,
		},
		{
			inputRef: discountInput,
			changeHandler: handleDiscountChange,
			clickHandler: calculateNewPrice,
			type: 'applyDiscount',
			// newValue: discountChange,
		},
		{
			inputRef: totalInput,
			changeHandler: handlePriceChange,
			clickHandler: sendChange,
			type: 'total',
			// newValue: priceChange,
		},
	];

	function handleCommentChange(
		orderId: number,
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const newComment = String(event.target.value);
		setCommentChange((prev) => ({ ...prev, [orderId]: newComment }));
	}

	function handlePriceChange(
		orderId: number,
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const newTotal = Number(event.target.value);
		setPriceChange((prev) => ({ ...prev, [orderId]: newTotal }));
	}

	function handleDiscountChange(
		orderId: number,
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const newDiscount = Number(event.target.value);
		setDiscountChange((prev) => ({ ...prev, [orderId]: newDiscount }));
	}

	async function calculateNewPrice(
		order: Order,
		type: string,
		percentage: number
	) {
		const newPrice = Math.round(
			order.total - (order.total / 100) * percentage
		);
		console.log('i calculateNewPrice newPrice är: ', newPrice);

		await sendChange(order, type, newPrice);
	}

	async function sendChange(
		order: Order,
		type: string,
		newValue: string | number
	) {
		if (newValue === null || newValue === undefined) {
			return;
		}

		try {
			await updateLockedOrder(order, type, newValue);
		} catch (error) {
			console.log(error);
		}
		// Kom ihåg att skicka med change-variabeln!
		setChange((change) => change + 1);
		if (
			commentInput.current &&
			discountInput.current &&
			totalInput.current
		) {
			commentInput.current.value = '';
			discountInput.current.value = '';
			totalInput.current.value = '';
		}
	}

	return (
		<div className='recieved-order-card' key={order.orderId}>
			<div className='order-content'>
						<div className="order-title">
							<p className="order-title-description number">Order number</p>
							<h1>{order.orderId}</h1>
						</div>

						<div className="order-title">
							<p className="order-title-description email">Customer info</p>
							<span className="title-customer-info">{order.customername}</span>
							<span className="title-customer-info">{order.customermail}</span>
						</div>
				<ArrowButtons
					isExpanded={isExpanded}
					setIsExpanded={setIsExpanded}
					order={order}
				/>

			</div>
			{isExpanded === order.orderId && (
				<section className='order-info-section'>
					<ul className='order-info-list'>
						{order.content.map((item) => (
							<li className='order-product-name' key={item.name}>
								{item.name} {item.quantity}x
							</li>
						))}
						<hr className='linebreak-current' />
					</ul>

					{page === 'current' ? (
						<>
							<div className='user-comment-section'>
								<p className='order-comment'>User commments:</p>
								<span className='user-comment'>
									{order.usercomment}
								</span>
							</div>

							<div className='staff-comment-section'>
								<p className='order-staff-comment'>
									Staff comments:
								</p>
								<span className='staff-comment'>
									{order.staffcomment}
								</span>
							</div>
							<button
								className='reset-button'
								onClick={() =>
									sendChange(order, 'comment-reset', '')
								}
							>
								{' '}
								Reset comments
							</button>

							<section className='staff-edit-section'>
								{PropsListForStaffInput.map(
									({
										inputRef,
										changeHandler,
										clickHandler,
										type,
									}) => (
										<StaffInput
											key={type}
											inputRef={inputRef}
											changeHandler={changeHandler}
											clickHandler={clickHandler}
											order={order}
											type={type}
										/>
									)
								)}
							</section>
						</>
					) : (
						<>
							<h3 className='order-comment'>User commments:</h3>
							<span>{order.usercomment}</span>
						</>
					)}

					{order.content.map((item) => (
						<div className=' current-price' key={item.name}>
							Total: <span>{order.total}</span> Kr
						</div>
					))}

					<OrderHandlers
						page={page}
						order={order}
						setOrderData={setOrderData}
						change={change}
						setChange={setChange}
					/>
				</section>
			)}
		</div>
	);
};

export default OrderCard;
