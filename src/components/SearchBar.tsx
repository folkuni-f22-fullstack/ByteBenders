import { signal } from '@preact/signals-react';
import menu from '../data/menu.json';
import dishMatch from '../utils/search.ts';
import { ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import '../styles/searchBar.css';

const searchString = signal('');
const fullMenu = signal(menu);
export const searchList = signal(fullMenu.value);

const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
	searchString.value = event.target.value;
	if (searchString.value) {
		searchList.value = fullMenu.value.filter((dish) =>
			dishMatch(dish.name, searchString.value)
		);
	} else {
		searchList.value = fullMenu.value;
	}
};

// TODO: Lägg in FilterMeals här istället för i Meals
// TODO: Koppla filter-btn till showFilters-variabeln

const SearchBar = () => {
	return (
		<div className='search-bar'>
			<AiOutlineSearch />
			<input
				type='text'
				id='search-input'
				onChange={handleSearchChange}
			/>
			<button className='filter-btn'>
				<BsFilter />
			</button>
		</div>
	);
};

export default SearchBar;
