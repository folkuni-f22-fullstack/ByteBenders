import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import menuData from '../data/menu.json'

function CartCard() {
	
	// Get item from local storage
	const cartData = JSON.parse(localStorage.getItem('cart')) || []
	const [cartCopy, setCartCopy] = useState([...cartData])

	// Quantity count
	function updateQuantity(index, change) {
		const updateCart = [...cartCopy]
		const findItem = menuData.find((cartItem) => cartItem.id == updateCart[index].id)

		// Set counter
		updateCart[index].quantity += change

		if(change === 1) {
			updateCart[index].price += findItem.price
		}
		else if (change === -1) {
			updateCart[index].price -= findItem.price
		}

		// Remove from local storage when quantity equal 0
		if(updateCart[index].quantity === 0) {
			localStorage.removeItem(updateCart[index].id)
			updateCart.splice(index, 1)
		}

		// Update local storage
		localStorage.setItem('cart', JSON.stringify(updateCart))

		setCartCopy(updateCart)
	}

	return (
		<section>
			<div className="cart-card-container">
				{cartCopy.map((item, index) => (
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
									onClick={() => updateQuantity(index, -1)}
								>-
								</button>
								<p className='food-amount'>{item.quantity} </p>
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