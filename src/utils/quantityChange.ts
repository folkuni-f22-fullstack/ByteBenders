import { quantity } from './addCartLS';

// Set value to 1
export function refreshQuantity() {
	quantity.value = 1;
}

// Quantity count
export function updateQuantity(change: number) {
	// Cannot be less than one
	if (quantity.value >= 1) {
		let newQuantity = (quantity.value += change);
		newQuantity = Math.max(newQuantity, 1);
		quantity.value = newQuantity;
	}
}
