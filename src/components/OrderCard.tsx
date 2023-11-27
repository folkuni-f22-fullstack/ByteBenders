import React from 'react';
import { OrderCardProps } from '../interfaces/OrderCardProps';

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
	return <div className='recieved-order-card' key={order.orderId}></div>;
};

export default OrderCard;
