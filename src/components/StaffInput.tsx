import React from 'react';
import { StaffInputProps } from '../interfaces/staffInputProps';

const StaffInput: React.FC<StaffInputProps> = ({
	inputRef,
	changeHandler,
	clickHandler,
	order,
	type,
}) => {
	return (
		<div className='current-input'>
			<input
				className='edit-current-input edit-current-desktop'
				type='text'
				placeholder={
					type === 'comment'
						? 'Add staff comment'
						: type === 'applyDiscount'
						? 'Apply discount percentage'
						: 'Edit order price'
				}
				ref={inputRef}
				onChange={(event) => changeHandler(order.orderId, event)}
			/>
			{inputRef.current !== null && inputRef.current.value !== '' && (
				<button
					className='confirm-button'
					onClick={() => {
						clickHandler(order, type, inputRef.current!.value);
						inputRef.current!.value = '';
					}}
				>
					Confirm
				</button>
			)}
		</div>
	);
};

export default StaffInput;
