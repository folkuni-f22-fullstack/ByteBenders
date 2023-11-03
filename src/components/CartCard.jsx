import { addToCart } from "../routes/ProductDetailsRoute.tsx";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";

function CartCard() {
	const itemValue = addToCart.value.map(() => 1)
	const [quantities, setQuantities] = useState(itemValue)


	const updateQuantity = (index, updateValueByOne) => {
		const updateQuantities = [...quantities]
		updateQuantities[index] += updateValueByOne
		updateQuantities[index] = Math.max(updateQuantities[index], 0)
		setQuantities(updateQuantities)
	}

	useEffect(() => {
		const cartData = JSON.stringify({ quantities })
		localStorage.setItem('cartData', cartData)
	}, [quantities])

	useEffect(() => {
		const cartData = localStorage.getItem('cartData')
		if (cartData) {
			const { quantities: loadedQuantities } = JSON.parse(cartData)
			setQuantities(loadedQuantities)
		}
	}, [])

	const cartItems = addToCart.value.filter((item, index) => quantities[index] > 0)

	return (
		<section>
			<div className="cart-card-container">
				{cartItems.map((item, index) => (
					<div key={index}>
						<div className="cart-card" key={index}>
							<NavLink to={`/menu/${item.id}`} className='cart-image-container'>
								<img className="cart-image" src={item.image} />
							</NavLink>
							<NavLink to={`/menu/${item.id}`} className='cart-name'> {item.name} </NavLink>
							<p className='sub-text'>Lorem ipsum</p>
							<p className='total-price'> {item.price}:- </p>
							<div className='amount-container'>
								<button
									className='sub'
									onClick={() => updateQuantity(index, - 1)}
								>-
								</button>
								<p className='food-amount'>{quantities[index]} </p>
								<button
									className='plus'
									onClick={() => updateQuantity(index, 1)}
								>+
								</button>
							</div>
						</div>
						<button className="customize-order">Customize order +</button>
					</div>
				))}
			</div>
		</section>
	)
}

export default CartCard