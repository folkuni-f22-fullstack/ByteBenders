import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Order } from '../interfaces/order';
import React from 'react';

type ArrowButtonProps = {
	isExpanded: null | number;
	setIsExpanded: (order: number | null) => void;
	order: Order;
};

const ArrowButtons: React.FC<ArrowButtonProps> = ({
	isExpanded,
	setIsExpanded,
	order,
}) => {
	return (
		<div className='extend-order-icons'>
			{isExpanded === order.orderId ? (
				<button
					onClick={() => setIsExpanded(null)}
					className='close-order-icon'
				>
					<IoIosArrowUp />
				</button>
			) : (
				<button
					onClick={() => setIsExpanded(order.orderId)}
					className='open-order-icon'
				>
					<IoIosArrowDown />
				</button>
			)}
		</div>
	);
};

export default ArrowButtons;
