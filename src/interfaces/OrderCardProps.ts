import { Dispatch, SetStateAction } from 'react';
import { Order } from './order';

export type OrderCompProps = {
	change: number;
	setChange: (value: number) => void;
};

export type OrderCardProps = {
	order: Order;
	page: string;
	setOrderData: Dispatch<SetStateAction<Order[] | null>>;
	change: number;
	setChange: (value: number) => void;
};

export type OrderHandlerProps = {
	page: string;
	order: Order;
	setOrderData: React.Dispatch<React.SetStateAction<Order[] | null>>;
	change: number;
	setChange: (value: number) => void;
};
