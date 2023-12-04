import React, { useState, useEffect } from 'react';
import '../styles/meals.css';
import '../styles/categories.css';
import CartRoute from '../routes/CartRoute';
import addToLS from '../utils/addCartLS';
import { Dish } from '../interfaces/dish.ts';
import SearchBar from './SearchBar.tsx';
import { filterByCategory } from '../utils/filter.ts';
import { useRecoilState } from 'recoil';
import { isCartEmptyState } from '../recoil/cartNumberState.js';
import WindowSizeListener from '../utils/WindowListener.tsx';
import { menuState } from '../recoil/menuState.js';
import { selectedFiltersState } from '../recoil/selectedFiltersState.js';
import { cartState } from '../recoil/cartNumberState.js';
import CategoryButton from './CategoryButton.tsx';
import MealCard from './MealCard.tsx';
import SelectedFilters from './SelectedFilters.tsx';

const Meals: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [listToShow, setListToShow] = useState<Dish[]>([]);
	const [isCartEmpty, setIsCartEmpty] =
		useRecoilState<boolean>(isCartEmptyState);
	const [fullMenu, setFullMenu] = useRecoilState<Dish[]>(menuState);
	const [selectedFilters, setSelectedFilters] =
		useRecoilState<string[]>(selectedFiltersState);
	let [cartItems, setCartItems] = useRecoilState<number>(cartState);
	const [searchMode, setSearchMode] = useState<boolean>(false);

	useEffect(() => {
		setListToShow(filteredItems);
	}, [selectedCategory, fullMenu]);

	// The original list that is sent to the search and filter functions.
	const filteredItems: Dish[] =
		selectedCategory === 'all'
			? fullMenu
			: filterByCategory(selectedCategory, fullMenu);

	const windowWidth = WindowSizeListener();

	// Clears filters and searchfield
	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category);
		setSelectedFilters([]);
		setSearchMode(false);
	};

	// Add to local storage
	async function handleAddToCart(id: number) {
		await addToLS(id, '/api/meals');
		setIsCartEmpty(!isCartEmpty);
		setCartItems((cartItems += 1));
	}

	const handleRemoveFilter = (filterToRemove: string) => {
		const updatedFilters = selectedFilters.filter(
			(filter) => filter !== filterToRemove
		);
		setSelectedFilters(updatedFilters);
	};

	const categoryList = [
		{ text: 'All', name: 'all' },
		{ text: 'Meals', name: 'meals' },
		{ text: 'Sides', name: 's_ides' },
		{ text: 'Drinks', name: 'drinks' },
	];

	return (
		<section className='meals-main'>
			<section className='meals-section'>
				<section className='searchbar-section'>
					<SearchBar
						list={filteredItems}
						setListToShow={(newList) =>
							setListToShow(newList || [])
						}
						fullMenu={fullMenu}
						searchMode={searchMode}
						setSearchMode={setSearchMode}
					/>
					{selectedFilters.length > 0 && (
						<SelectedFilters
							selectedFilters={selectedFilters}
							handleRemoveFilter={handleRemoveFilter}
						/>
					)}
				</section>
				<section className='category-button-section'>
					{categoryList.map((category) => (
						<CategoryButton
							key={category.name}
							selectedCategory={selectedCategory}
							handleCategoryClick={handleCategoryClick}
							buttonText={category.text}
							databaseCategoryName={category.name}
						/>
					))}
				</section>
				{/* Check if listToShow exixts, else show a spinner */}
				{listToShow.map((menuItem: Dish) => (
					<MealCard
						key={menuItem._id}
						menuItem={menuItem}
						handleAddToCart={handleAddToCart}
					/>
				))}
			</section>
			{windowWidth > 1200 ? (
				<div className='cart-route-container'>
					<CartRoute />
				</div>
			) : null}
		</section>
	);
};
export default Meals;
