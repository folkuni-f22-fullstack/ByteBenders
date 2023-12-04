import React, { useEffect, useRef } from 'react';
import { FilterMealsProps } from '../interfaces/search-and-filter-props';
import { updateSelectedFilters, filterBySubcategory } from '../utils/filter';
import { useRecoilState } from 'recoil';
import { subState } from '../../src/recoil/subCategoryState.js';
import { Dish } from '../interfaces/dish.js';
import { selectedFiltersState } from '../recoil/selectedFiltersState.js';
import { TiDelete } from 'react-icons/ti';

const FilterMeals: React.FC<FilterMealsProps> = ({
	list,
	setListToShow,
	searchMode,
	setSearchMode,
	subMenuRef,
	fullMenu,
}) => {
	const [selectedFilters, setSelectedFilters] =
		useRecoilState<string[]>(selectedFiltersState);
	const [showFilters, setShowFilters] = useRecoilState(subState);
	const subCategoryRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// For each item in selectedFilters, add the dishes that match the subcategory.
		filterBySubcategory(selectedFilters, list, setListToShow, allButDrinks);
	}, [selectedFilters]);

	useEffect(() => {
		if (searchMode) {
			setSelectedFilters([]);
			// Clears filters when typing in the search field.
		}
	}, [searchMode]);

	const allButDrinks = fullMenu.filter(
		(item) => item.category !== 'drinks'
	) as Dish[];

	// Create a list with all subcategories, only one of each.
	const subcategories: string[] = [
		...new Set(allButDrinks.flatMap((dish) => dish.subcategory)),
	];

	// Adds the subcategory to the selectedFilters array if clicked, removes it if clicked again.
	const handleCategoryClick = (category: string) => {
		setSearchMode(false); // <- tömmer sökfältet
		const filteredList = updateSelectedFilters(
			selectedFilters,
			category
		) as string[];
		setSelectedFilters(filteredList);
	};

	// Close the submenu if a click occurs outside the element or on the submenu button
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				subCategoryRef.current &&
				!subCategoryRef.current.contains(event.target as Node) &&
				event.target !== subMenuRef
			) {
				setTimeout(() => {
					setShowFilters(false);
				}, 0);
			}
		}
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [subCategoryRef]);

	return (
		<>
			{showFilters && (
				<div ref={subCategoryRef} className='filter-select'>
					{subcategories.map((subcategory: string) => (
						<button
							key={subcategory}
							onClick={() => handleCategoryClick(subcategory)}
							className={
								selectedFilters?.includes(subcategory)
									? 'selected-filter'
									: ''
							}
						>
							{!selectedFilters?.includes(subcategory) ? (
								subcategory
							) : (
								<>
									{subcategory}
									<TiDelete className='selected-filter-icon' />
								</>
							)}
						</button>
					))}
				</div>
			)}
		</>
	);
};

export default FilterMeals;
