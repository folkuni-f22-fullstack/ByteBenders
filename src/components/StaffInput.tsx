import { RefObject } from 'react';
import { Order } from '../interfaces/order';
import { GoCheckbox } from 'react-icons/go';

type OrderClickFunction<T> = (
	order: Order,
	type: string,
	value: T
) => Promise<void>;

type StaffInputProps = {
	inputRef: RefObject<HTMLInputElement>;
	changeHandler: (
		orderId: number,
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	clickHandler: OrderClickFunction<string> | OrderClickFunction<number>;
	order: Order;
	type: string;
};

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
						? 'Add comment'
						: type === 'applyDiscount'
						? 'Apply discount'
						: 'Edit order price'
				}
				ref={inputRef}
				onChange={(event) => changeHandler(order.orderId, event)}
			/>
			{inputRef.current !== null && inputRef.current.value !== '' && (
				<button
					className='confirm-button'
					onClick={() => {
						clickHandler(order, type, inputRef.current.value);
						inputRef.current.value = '';
					}}
				>
					Confirm
				</button>
			)}
		</div>
	);
};

export default StaffInput;
