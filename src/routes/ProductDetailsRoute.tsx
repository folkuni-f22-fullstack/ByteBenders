import { useState, useEffect } from 'react';
import { BiArrowBack, BiMinus, BiPlus } from 'react-icons/bi';
import { NavLink, useParams } from 'react-router-dom';
import { quantity } from '../utils/addCartLS.tsx';
import '../styles/details.css';
import CartRoute from './CartRoute.tsx';
import { useRecoilState } from 'recoil';
import { isCartEmptyState } from '../recoil/cartNumberState.js';
import WindowSizeListener from '../utils/WindowListener.tsx';
import { Dish } from '../interfaces/dish.ts';
import { getMealsID } from '../utils/fetch.tsx';
import { updateQuantity } from '../utils/quantityChange.ts';
import { cartState } from '../recoil/cartNumberState.js';

export default function ProductDetailsRoute() {
	const [product, setProduct] = useState<null | Dish[]>(null);
	const [isCartEmpty, setIsCartEmpty] = useRecoilState(isCartEmptyState);
	const { id } = useParams<{ id: string }>();
	let [cartItems, setCartItems] = useRecoilState(cartState);

	const windowWidth = WindowSizeListener();

	const mealID = getMealsID();

	useEffect(() => {
		async function fetchMealsId() {
			setProduct(await mealID);
		}
		try {
			fetchMealsId();
		} catch {
			console.log('error');
		}
	}, [id]);

	// Send to local storage
	function handleAddToCart() {
		const cartItem = {
			image: product.image,
			content: [],
			usercomment: '',
			staffcomment: '',
			name: product.name,
			total: product.price * quantity,
			quantity: quantity,
			locked: false,
			status: '',
		};
		const existingCartData = JSON.parse(localStorage.getItem('cart')) || [];

		const matchingId = existingCartData.findIndex(
			(item) => item.name === cartItem.name
		);
		if (matchingId !== -1) {
			existingCartData[matchingId].quantity += cartItem.quantity;
			existingCartData[matchingId].total += cartItem.total;
		} else {
			existingCartData.push(cartItem);
		}
		localStorage.setItem('cart', JSON.stringify(existingCartData));
		setIsCartEmpty(!isCartEmpty);
		setCartItems((cartItems += 1));
	}

	return (
		<>
			{product && (
				<main className='details-page'>
					<section className='details-container'>
						<NavLink to='/menu'>
							<BiArrowBack className='return-arrow-icon' />
						</NavLink>
						<img
							src={product.image}
							alt={`image of ${product.name}`}
							className='dish-img'
						/>
						<div className='amount-price'>
							<div className='detail-amount'>
								<button
									className='amount-detail-button'
									onClick={() => updateQuantity(-1)}
								>
									<BiMinus className='sub-amount-icon' />
								</button>
								<div className='amount-count'>{quantity}</div>
								<button
									className='amount-detail-button'
									onClick={() => updateQuantity(1)}
								>
									<BiPlus className='add-amount-icon' />
								</button>
							</div>
							<p className='detail-price'>
								{product.price * quantity} :-
							</p>
						</div>
						<div className='details-text'>
							<h4 className='detail-header'>{product.name}</h4>
							{product.allergenes &&
								product.allergenes.length !== 0 &&
								product.allergenes[0] !== '' && (
									<p className='allergenes-p'>
										<span className='allergenes-span'>
											Allergenes:
										</span>{' '}
										{product.allergenes}
									</p>
								)}

							<p className='description-text'>
								{product.description}
							</p>
						</div>
						<button className='cart-btn' onClick={handleAddToCart}>
							Add to Cart
						</button>
					</section>
					{windowWidth > 1200 ? (
						<div className='cart-route-container'>
							<CartRoute />
						</div>
					) : null}
				</main>
			)}
		</>
	);
}
