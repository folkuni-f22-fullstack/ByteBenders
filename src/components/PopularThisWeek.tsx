import '../styles/meals.css';
import { BsCart3 } from 'react-icons/bs';
import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import addToLS from '../utils/addCartLS';
import { useRecoilState } from 'recoil';
import { isCartEmptyState } from '../recoil/cartNumberState.js';
import { cartState } from '../recoil/cartNumberState.js';
import axios from 'axios';
import { Dish } from '../interfaces/dish.js';
import { refreshQuantity } from '../utils/quantityChange.js';
import '../styles/popularThisWeek.css';

export default function PopularThisWeek() {
	const [randomMeals, setRandomMeals] = useState<Dish[]>([]);
	const [isCartEmpty, setIsCartEmpty] =
		useRecoilState<boolean>(isCartEmptyState);
	let [cartItems, setCartItems] = useRecoilState<number>(cartState);
	const popularSectionRef = useRef<HTMLElement>(null);
	const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
		window.innerWidth > 1200
	);

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
	}, []);

	useEffect(() => {
		// Function to update screen size
		function updateScreenSize() {
			setIsLargeScreen(window.innerWidth > 1200);
		}
		window.addEventListener('resize', updateScreenSize);
		return () => {
			window.removeEventListener('resize', updateScreenSize);
		};
	}, []);

	// Add to local storage
	async function handleAddToCart(id: number) {
		await addToLS(id, 'api/popular');
		setIsCartEmpty(!isCartEmpty);
		setCartItems((cartItems += 1));
	}
	// Checks if user has activated reduced-motion-mode
	const reducedMotionSettings = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	).matches;

	return (
		<section className='popular-main'>
			<div className='pop-hero-div'>
				<h1 className='most-popular-title'>
					{' '}
					Most popular{' '}
					<span className='pop-title-span'>this week</span>
				</h1>
			</div>
			<section
				className={`popular-section scroller snaps-inline`}
				ref={popularSectionRef}
				data-animated={!reducedMotionSettings && true}
			>
				<ul className='scroller__inner'>
					{[
						...Array(
							isLargeScreen && !reducedMotionSettings ? 2 : 1
						),
					].map((_, loopIndex) =>
						randomMeals.map((menuItem: Dish) => (
							<li
								className='meals-card'
								key={menuItem._id}
								aria-hidden={loopIndex === 0 ? 'false' : 'true'}
							>
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
									onClick={() =>
										handleAddToCart(menuItem._id)
									}
								>
									Add to cart <BsCart3 className='btn-icon' />
								</button>
							</li>
						))
					)}
				</ul>
			</section>
		</section>
	);
}
