export type Order = {
	orderId: number;
	date: string;
	content: string[];
	usercomment: string;
	staffcomment: string;
	total: number;
	status: string;
	locked: boolean;
};

export type OrderStateType = {
	isOrdered: boolean;
	isWaiting: boolean;
	orderNumber: string;
};
