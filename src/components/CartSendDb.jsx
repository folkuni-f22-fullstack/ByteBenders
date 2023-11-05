import { promo } from "./CartCard"

function SendCartData() {
	const cartData = JSON.parse(localStorage.getItem('cart')) || []

	async function handlePost() {
			// Temporary URL until we have a server
			const response = await fetch('../../src/data/cart.json', {
				method: 'POST',
				body: JSON.stringify({
					id: cartData.id,
					name: cartData.name,
					price: promo.value,
					comment: cartData.comment
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log('Response', response.status)
			console.log('Total price with dicount', promo.value);
			console.log(cartData)
		
	}

	return (
		<button className="send-cart-button" onClick={handlePost}>Checkout</button>
	)
}

export default SendCartData