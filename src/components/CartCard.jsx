import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import menuData from '../data/menu.json'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { MdLabelOutline } from 'react-icons/md'
import SendCartData from './CartSendDb';

function CartCard() {

	// Get item from local storage
	const cartData = JSON.parse(localStorage.getItem('cart')) || []
	const [cartCopy, setCartCopy] = useState([...cartData])
	let [totalPrice, setTotalPrice] = useState(0)
	const [customizeState, setCustomizeState] = useState({})

	// Quantity count
	function updateQuantity(index, change) {
		const updateCart = [...cartCopy]
		const findItem = menuData.find((cartItem) => cartItem.id == updateCart[index].id)

		// Set counter
		updateCart[index].quantity += change

		if (change === 1) {
			updateCart[index].price += findItem.price
		}
		else if (change === -1) {
			updateCart[index].price -= findItem.price
		}

		// Remove from local storage when quantity equal 0
		if (updateCart[index].quantity === 0) {
			localStorage.removeItem(updateCart[index].id)
			updateCart.splice(index, 1)
		}

		// Update local storage
		localStorage.setItem('cart', JSON.stringify(updateCart))
		setCartCopy(updateCart)
	}

	// Count total price
	cartCopy.forEach((item) => {
		totalPrice += item.price
	})

	// Send customize order to local storage
	function updateComment(id) {
		const updateCartComment = cartCopy.map((item) => {
			if (item.id === id) {
				// Copy of item and update comment property by id. If undifined set empty string as default value.
				return { ...item, comment: customizeState[id] || '' }
			}
			return item
		})
		// Update local storage
		localStorage.setItem('cart', JSON.stringify(updateCartComment))
		setCartCopy(updateCartComment)
	}

	return (
		<section className='cart-section'>
			<div className="cart-card-container">
				{cartCopy.map((item, index) => (
					<div className='cart-card' key={index}>
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
							> <BiMinus className='BiMinus' />
							</button>
							<p className='food-amount'>{item.quantity} </p>
							<button
								className='plus'
								onClick={() => updateQuantity(index, 1)}
							><BiPlus className='BiPlus' />
							</button>
						</div>
						<input
							className='customize-order'
							type='text'
							placeholder= {item.comment == '' ? 'Customize your order +' : item.comment}
							// display data for specific item or empty string
							value={customizeState[item.id] || ''}
							onChange={(e) => {
								const newCustomizeState = { ...customizeState }
								newCustomizeState[item.id] = e.target.value
								setCustomizeState(newCustomizeState)
							}}
							onBlur={() => updateComment(item.id)}
						></input>
					</div>
				))}
			</div>
			<div className='cart-promo-container'>
				<MdLabelOutline size={20} className='promo-icon' />
				<input className='promo-code' type='text' placeholder='Promo code' />
				<button className='apply-promo-button'>Apply</button>
			</div>
			<div className='cart-total-container'>
				<p className='total-text'>Total:</p>
				<p className='total-price'>{totalPrice}:-</p>
			</div>
			<SendCartData />
		</section>
	)
}

export default CartCard