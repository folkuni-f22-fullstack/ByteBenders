import { useState, useEffect, useRef } from 'react';
// import menu from '../data/menu.json';
import dishMatch from '../utils/search.ts';
import { ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import FilterMeals from './FilterMeals.tsx';
import { SearchBarProps } from '../interfaces/search-and-filter-props.ts';
import { Dish } from '../interfaces/dish.ts';
import { useRecoilState } from 'recoil';
import { subState } from '../../src/recoil/subCategoryState.js';
import '../styles/searchBar.css';
import axios from 'axios';

const SearchBar: React.FC<SearchBarProps> = ({
	list,
	setListToShow,
	fullMenu,
	searchMode,
	setSearchMode,
}) => {
	const [showFilters, setShowFilters] = useRecoilState(subState);
	const [searchInput, setSearchInput] = useState('');
	const subMenuRef = useRef<HTMLButtonElement | null>(null);

	// searchMode kontrollerar om man ska söka eller filtrera
	useEffect(() => {
		if (searchInput) {
			setSearchMode(true);
		} else {
			setSearchMode(false);
		}
	}, [searchInput]);

	// searchMode sätts till false när man klickar på ett filter i FilterMeals -> då töms input-fältet
	useEffect(() => {
		if (!searchMode) {
			setSearchInput('');
		}
	}, [searchMode]);

	//om uef en funktion som anropas i uef som är asyncron

	const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const searchString = event.target.value;
		setSearchInput(searchString);

		try {
			if (searchString) {
				const response = await axios.get(
					`/api/meals?search=${searchString}`
				);
				const searchList: Dish[] = response.data.filter((dish) =>
					dishMatch(dish.name, searchString)
				);
				setListToShow(searchList);
			} else {
				setListToShow(list);
			}
		} catch (error) {
			console.log('Error fetching dishes: ', error);
		}
	};

	return (
		<div className='search-bar'>
			<div className='search-input-container'>
				<AiOutlineSearch />
				<input
					type='text'
					id='search-input'
					onChange={handleSearchChange}
					onFocus={() => setShowFilters(false)}
					value={searchInput}
				/>
				<button
					className='filter-btn'
					onClick={() => setShowFilters(true)}
					ref={subMenuRef}
				>
					<BsFilter />
				</button>
			</div>
			<FilterMeals
				list={list}
				setListToShow={setListToShow}
				searchMode={searchMode}
				setSearchMode={setSearchMode}
				subMenuRef={subMenuRef}
				fullMenu={fullMenu}
			/>
		</div>
	);
};

export default SearchBar;
