import React, { useState, useRef, useEffect } from 'react';
import { OrderCardProps } from '../interfaces/OrderCardProps';
import { updateLockedOrder } from '../utils/fetch';
import StaffInput from './StaffInput';
import OrderHandlers from './OrderHandlers';
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

  const [priceChange, setPriceChange] = useState<{ [key: number]: number }>({});
  const [commentChange, setCommentChange] = useState<{
    [key: number]: string;
  }>({});
  const [discountChange, setDiscountChange] = useState<{
    [key: number]: number;
  }>({});

	const totalInput = useRef<HTMLInputElement | null>(null);
	const commentInput = useRef<HTMLInputElement | null>(null);
	const discountInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {}, [change]);

	// List on inputs, changehandlers, clickhandlers and type for staffInput-fields
	const PropsListForStaffInput = [
		{
			inputRef: commentInput,
			changeHandler: handleCommentChange,
			clickHandler: sendChange,
			type: 'comment',
		},
		{
			inputRef: discountInput,
			changeHandler: handleDiscountChange,
			clickHandler: calculateNewPrice,
			type: 'applyDiscount',
		},
		{
			inputRef: totalInput,
			changeHandler: handlePriceChange,
			clickHandler: sendChange,
			type: 'total',
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

	// Calculates the new price if staff entered in discount
	async function calculateNewPrice(
		order: Order,
		type: string,
		percentage: number
	) {
		const newPrice = Math.round(
			order.total - (order.total / 100) * percentage
		);

    await sendChange(order, type, newPrice);
  }

	// Makes changes in the order and empties the input fields
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
				<div className='order-title'>
					<p className='order-title-description number'>
						Order number
					</p>
					<h1>{order.orderId}</h1>
				</div>

				<div className='order-title'>
					<div className='order-title-description'>
						<p className='email'>{order.date.split('GMT')[0]}</p>
						<p>
							{order.content.reduce((total, item) => {
								return total + item.quantity;
							}, 0)}{' '}
							item(s)
						</p>
					</div>
					<span className='title-customer-info'>
						{order.customername}
					</span>
					<span className='title-customer-info'>
						{order.customermail}
					</span>
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
								<div>
									<span className='item-quantity'>
										x{item.quantity}
									</span>{' '}
									{item.name}
								</div>
								<span>{item.total}:-</span>
							</li>
						))}

						<span className=' current-price'>
							Total: {order.total}:-
						</span>
						<hr className='linebreak-current' />
					</ul>

          {page === "current" ? (
            <>
              <div className="user-comment-section">
                <p className="order-comment">User comments:</p>
                <span className="user-comment">{order.usercomment}</span>
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
							<h3 className='order-comment'>User comments:</h3>
							<span className='user-comment-field'>
								{order.usercomment}
							</span>
						</>
					)}

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
