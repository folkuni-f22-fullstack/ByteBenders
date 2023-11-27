import '../styles/meals.css';
import { BsCart3 } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import addToLS from '../utils/addCartLS';
import { quantity } from '../utils/addCartLS';
import { useRecoilState } from 'recoil';
import { isCartEmptyState } from '../recoil/cartNumberState.js';
import { cartState } from '../recoil/cartNumberState.js';
import axios from 'axios';
import { Dish } from '../interfaces/dish.js';
import { refreshQuantity } from '../utils/quantityChange.js';

export default function PopularThisWeek() {
	const [randomMeals, setRandomMeals] = useState([]);
	const [isCartEmpty, setIsCartEmpty] = useRecoilState(isCartEmptyState);
	let [cartItems, setCartItems] = useRecoilState(cartState);

	useEffect(() => {
		async function fetchPopular() {
			try {
				const response = await axios.get('/api/popular');
				setRandomMeals(await response.data);
			} catch (error) {
				console.error(error);
			}
		}

		fetchPopular();

		return () => {};
	}, []);

	// Add to local storage
	async function handleAddToCart(id: number) {
		await addToLS(id, 'api/popular');
		setIsCartEmpty(!isCartEmpty);
		setCartItems((cartItems += 1));
	}

	return (
		<section className='popular-main'>
			<div className='pop-hero-div'>
				<h1 className='most-popular-title'>
					{' '}
					Most popular{' '}
					<span className='pop-title-span'>this week</span>
				</h1>
			</div>
			<section className='popular-section snaps-inline'>
				{randomMeals &&
					randomMeals.map((menuItem: Dish) => (
						<div className='meals-card' key={menuItem._id}>
							<NavLink
								to={`/menu/${menuItem._id}`}
								className='meals-link'
							>
								<img
									src={menuItem.image}
									alt={`image of ${menuItem.name}`}
									className='meals-img'
									onClick={refreshQuantity}
								/>
								<div className='meals-text'>
									<p>{menuItem.name}</p>
									<p className='meals-price'>
										{menuItem.price} :-
									</p>
								</div>
							</NavLink>
							<button
								className='meals-btn'
								onClick={() => handleAddToCart(menuItem._id)}
							>
								Add to cart <BsCart3 className='btn-icon' />
							</button>
						</div>
					))}
			</section>
		</section>
	);
}
