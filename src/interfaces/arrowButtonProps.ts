import { Order } from './order';

export type ArrowButtonProps = {
	isExpanded: null | number;
	setIsExpanded: (order: number | null) => void;
	order: Order;
};
