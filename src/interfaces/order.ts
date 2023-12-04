import { DishInCart } from './dish';

export type Order = {
	orderId: number;
	date: string;
	content: DishInCart[];
	usercomment: string;
	staffcomment: string;
	total: number;
	status: string;
	locked: boolean;
	customername: string;
	customermail: string;
};

export type OrderStateType = {
	isOrdered: boolean;
	isWaiting: boolean;
	orderNumber: string;
};
