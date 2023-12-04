import React, { RefObject } from 'react';
import { Order } from './order';

type OrderClickFunction<T extends string | number> = (
	order: Order,
	type: string,
	value: T
) => Promise<void>;

export type StaffInputProps = {
	inputRef: RefObject<HTMLInputElement>;
	changeHandler: (
		orderId: number,
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	clickHandler: OrderClickFunction<string | number>;
	order: Order;
	type: string;
};
