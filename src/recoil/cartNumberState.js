import { atom } from "recoil";

export const cartState = atom({
    key: 'cartState',
    default: 0,
})

export const isCartEmptyState = atom({
	key: 'isCartEmptyState',
	default: false
})