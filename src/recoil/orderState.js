import { atom } from 'recoil';

export const orderState = atom({
	key: 'orderState',
	default: {
		isOrdered: false,
		isWaiting: false,
		orderNumber: '',
	},
});
