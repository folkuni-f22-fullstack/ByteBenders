import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import React from 'react';
import { ArrowButtonProps } from '../interfaces/arrowButtonProps';

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
