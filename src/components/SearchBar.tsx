import { useState, useEffect, useRef } from 'react';
import menu from '../data/menu.json';
import dishMatch from '../utils/search.ts';
import { ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import FilterMeals from './FilterMeals.tsx';
import { SearchBarProps } from '../interfaces/search-and-filter-props.ts';
import { Dish } from '../interfaces/dish.ts';
import { useRecoilState } from 'recoil';
import { subState } from '../../src/recoil/subCategoryState.js'
import '../styles/searchBar.css';

const SearchBar: React.FC<SearchBarProps> = ({
	list,
	setListToShow,
	allButDrinks,
}) => {
	const [showFilters, setShowFilters] = useRecoilState(subState)
	const [searchMode, setSearchMode] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const subMenuRef = useRef(null)

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

	// Söker genom menyn och updaterar listToShow med rätterna som matchar. Om söksträngen är tom sätts listToShow till ursprungslistan
	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const searchString = event.target.value;
		setSearchInput(searchString);
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

	const handleFilter = () => {
		setShowFilters(true)
		console.log('ShowFilter: ', showFilters);
		
	}

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
					onClick={handleFilter}
					ref={subMenuRef}
				>
					<BsFilter />
				</button>
			</div>
			<FilterMeals
				list={list}
				setListToShow={setListToShow}
				// showFilters={showFilters}
				allButDrinks={allButDrinks}
				searchMode={searchMode}
				setSearchMode={setSearchMode}
				subMenuRef={subMenuRef}
			/>
		</div>
	);
};

export default SearchBar;
