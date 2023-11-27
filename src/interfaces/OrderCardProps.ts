import { Dispatch, SetStateAction } from 'react';
import { Order } from './order';

export type OrderCardProps = {
	order: Order;
	page: string;
	setOrderData: Dispatch<SetStateAction<Order[] | null>>;
	change: number;
	setChange: (value: number) => void;
};
