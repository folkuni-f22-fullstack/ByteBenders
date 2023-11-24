import { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { BiMinus, BiPlus, BiArrowBack } from 'react-icons/bi';
import { BsCart3 } from 'react-icons/bs';
import { MdLabelOutline } from 'react-icons/md';
import { signal } from '@preact/signals-react';
import SendCartData from './CartSendDb.tsx';
import { cartState } from '../recoil/cartNumberState.js';
import { getCartQuantity } from '../utils/general.ts';
import { useRecoilState } from 'recoil';
import { isCartEmptyState } from '../recoil/cartNumberState.js';
import OrderStatusCustomer from './OrderStatusCustomer.tsx';
import axios from 'axios';
import { Dish, DishInCart } from '../interfaces/dish.ts';
import { orderState } from '../recoil/orderState.js';
import { useNavigate } from 'react-router-dom';
import WindowSizeListener from '../utils/WindowListener.tsx';

export let promo = signal(0);
export let totalPrice = signal(0);
function CartCard() {
	// Get item from local storage
	// const cartData = JSON.parse(localStorage.getItem("cart")) || [];
	const [cartCopy, setCartCopy] = useState<DishInCart[]>([]);
	const [customizeState, setCustomizeState] = useState({});
	let [isPromo, setIsPromo] = useState('');
	const [isCartEmpty, setIsCartEmpty] = useRecoilState(isCartEmptyState);
	const [cartItems, setCartItems] = useRecoilState(cartState);
	const [orderFinished, setOrderFinished] = useState(null);
	const [cartItem, setCartItem] = useState<Dish[]>([]);
	const [currentOrder, setCurrentOrder] = useRecoilState(orderState);
	// const navigate = useNavigate();

	const windowWidth = WindowSizeListener();

	useEffect(() => {
		axios
			.get('/api/meals')
			.then((response) => setCartItem(response.data))
			.catch((error) => console.error('error feching meals', error));
	}, []);

	// Update cart, !! Utkommenterad pga Infinity Loop !!
	useEffect(() => {
		const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
		setCartCopy(updatedCart);
		// isCartEmpty toggles from Meals.jsx
	}, [localStorage.getItem('cart'), isCartEmpty]);

	// Quantity count
	const updateCart: DishInCart[] = [...cartCopy];
	function updateQuantity(index: number, change: number) {
		const findItem = cartItem.find(
			(cartItem) => cartItem.name == updateCart[index].name
		);

		// Set counter
		updateCart[index].quantity += change;
		if (change === 1) {
			updateCart[index].total += findItem?.price;
		} else if (change === -1) {
			updateCart[index].total -= findItem?.price;
		}

		// Remove from local storage when quantity equal 0
		if (updateCart[index].quantity === 0) {
			// remove item by index
			const removedItem = updateCart.splice(index, 1)[0];

			// Check if removeItem exist and have a valid name
			if (removedItem && removedItem.name) {
				localStorage.removeItem(removedItem.name);

				// Remove comment from customizeState
				const newCustomizeState = { ...customizeState };
				delete newCustomizeState[removedItem.name];
				setCustomizeState(newCustomizeState);
			}
		}

		// Update local storage
		localStorage.setItem('cart', JSON.stringify(updateCart));
		setCartCopy(updateCart);
		numberOfCartItems();
	}

	// Count total price
	function calculateTotalPrice() {
		let total = 0;
		cartCopy.forEach((item) => {
			total += item.total;
		});
		return total;
	}

  // Update promo code
  function handlePromoCodeChange(e) {
    const newPromoCode = e.target.value
    setIsPromo(newPromoCode)
    localStorage.setItem('promo-code', newPromoCode)
  }

  // Handle dicount
  function promoCode() {
    const storedPromoCode = localStorage.getItem("promo-code") || ''
    setIsPromo(storedPromoCode)

    const storedDiscount = localStorage.getItem("new-price")
    promo.value = JSON.parse(storedDiscount)

    if (storedPromoCode === "discount20%") {
      const discount = Math.round(totalPrice * 0.8)
      promo.value = discount
      localStorage.setItem("new-price", JSON.stringify(promo.value))
    } else if (isPromo === "") {
      promo.value = 0
    } else {
      promo.value = 0
    }
  }

  useEffect(() => {
    promoCode()
  }, [])


	// Update discount and total price
	useEffect(() => {
		totalPrice.value = calculateTotalPrice();
		promoCode();
	}, [cartCopy]);

	// Send customize order to local storage
	function updateComment(name) {
		const updateCartComment = updateCart.map((item) => {
			if (item.name === name) {
				// Copy of item and update comment property by id. If undifined set empty string as default value.
				return { ...item, usercomment: customizeState[name] || '' };
			}
			return item;
		});
		// Update local storage
		localStorage.setItem('cart', JSON.stringify(updateCartComment));
		setCartCopy(updateCartComment);
	}

	// Recursively counts items in cart
	function numberOfCartItems() {
		let count = 0;
		cartCopy.forEach((item) => {
			count = count + item.quantity;
		});
		return count;
	}

	useEffect(() => {
		setCartItems(getCartQuantity());
	}, [cartCopy]);

	return (
		<>
			<NavLink to='/menu'>
				<BiArrowBack className='return-arrow-icon' />
			</NavLink>
			<section className='cart-section'>
				<p className='cart-count'>
					{numberOfCartItems()} items in cart
				</p>
				<div className='cart-card-container'>
					{!currentOrder.isOrdered && !currentOrder.isWaiting && (
						<>
							{cartCopy.length === 0 &&
							!currentOrder.isOrdered ? (
								<div className='empty-cart-div'>
									<BsCart3 className='empty-cart-icon' />
									<h2 className='empty-h2'>
										Your cart is empty!
									</h2>
									<p className='empty-p'>
										Looks like you haven't added anything to
										the cart yet.
									</p>
								</div>
							) : (
								<>
									{/* Cart */}
									{cartCopy.map((item: DishInCart, index) => (
										<div className='cart-card' key={index}>
											<NavLink
												to={`/menu/${item._id}`}
												className='cart-image-container'
											>
												<img
													className='cart-image'
													src={item.image}
												/>
											</NavLink>
											<NavLink
												key={item._id}
												to={`/menu/${item._id}`}
												className='cart-name'
											>
												{' '}
												{item.name}{' '}
											</NavLink>
											<p className='card-price'>
												{' '}
												{item.total}:-{' '}
											</p>
											<p className='sub-text'>Amount: </p>
											<div className='amount-container'>
												<button
													className='sub'
													onClick={() =>
														updateQuantity(
															index,
															-1
														)
													}
												>
													{' '}
													<BiMinus className='BiMinus' />
												</button>
												<p className='food-amount'>
													{item.quantity}{' '}
												</p>
												<button
													className='plus'
													onClick={() =>
														updateQuantity(index, 1)
													}
												>
													<BiPlus className='BiPlus' />
												</button>
											</div>
											<input
												className='customize-order'
												type='text'
												placeholder={
													item.usercomment === ''
														? 'Customize your order +'
														: item.usercomment
												}
												// display data for specific item or empty string
												value={
													customizeState[item.name] ||
													''
												}
												onChange={(e) => {
													const newCustomizeState = {
														...customizeState,
													};
													newCustomizeState[
														item.name
													] = e.target.value;
													setCustomizeState(
														newCustomizeState
													);
												}}
												onBlur={() =>
													updateComment(item.name)
												}
											></input>
										</div>
									))}
								</>
							)}
						</>
					)}
					{/* orderstatus */}
					{<OrderStatusCustomer />}
				</div>
				{/* Promo */}
				<div className='cart-promo-container'>
					<MdLabelOutline size={20} className='promo-icon' />
					<input
						className='promo-code'
						type='text'
						placeholder='Promo code'
            value={(!currentOrder.isOrdered && !currentOrder.isWaiting) ? isPromo : ''}
						onChange={handlePromoCodeChange}
					/>
					<button className='apply-promo-button' onClick={promoCode}>
						Apply
					</button>
				</div>
				{/* Total price */}
				<div className='cart-total-container'>
					<p className='total-text'>Total:</p>
					<div className='price'>
          {!currentOrder.isOrdered && !currentOrder.isWaiting ? (
              <>
                {promo != 0 && <p className="new-price">{promo}:-</p>}
                <p className={promo == 0 ? "total-price" : "total-price--crossed"}>
                  {totalPrice}:-
                </p>
              </>
            ) : (
              <>
                <p className="total-price">
                  0:-
                </p>
              </>
            )}
					</div>
				</div>
				<SendCartData />
			</section>
		</>
	);
}

export default CartCard;
