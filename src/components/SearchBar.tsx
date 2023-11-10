import { useState } from 'react';
import menu from '../data/menu.json';
import dishMatch from '../utils/search.ts';
import { ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import FilterMeals from './FilterMeals.tsx';
import { SearchBarProps } from '../interfaces/search-and-filter-props.ts';
import { Dish } from '../interfaces/dish.ts';
import '../styles/searchBar.css';

const SearchBar: React.FC<SearchBarProps> = ({
	list,
	setListToShow,
	allButDrinks,
}) => {
	const [showFilters, setShowFilters] = useState(false);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const searchString = event.target.value;
		if (searchString) {
			const searchList: Dish[] | undefined = menu.filter((dish) =>
				dishMatch(dish.name, searchString)
			) as Dish[];
			if (searchList) {
				setListToShow(searchList);
			} else {
				setListToShow([]);
			}
		} else {
			setListToShow(list);
		}
	};

	return (
		<div className='search-bar'>
			<AiOutlineSearch />
			<input
				type='text'
				id='search-input'
				onChange={handleSearchChange}
			/>
			<button
				className='filter-btn'
				onClick={() => setShowFilters(!showFilters)}
			>
				<BsFilter />
			</button>
			<FilterMeals
				list={list}
				setListToShow={setListToShow}
				showFilters={showFilters}
				allButDrinks={allButDrinks}
			/>
		</div>
	);
};

export default SearchBar;
