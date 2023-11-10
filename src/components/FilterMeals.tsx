import { useState, useEffect } from 'react';
import { FilterMealsProps } from '../interfaces/search-and-filter-props';
import { updateSelectedFilters, filterBySubcategory } from '../utils/filter';

const FilterMeals: React.FC<FilterMealsProps> = ({
	list,
	setListToShow,
	showFilters,
	allButDrinks,
	searchMode,
	setSearchMode,
}) => {
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

	useEffect(() => {
		// för varje item i selectedFilters, lägg till de rätterna som matchar subcategory
		filterBySubcategory(selectedFilters, list, setListToShow, allButDrinks);
	}, [selectedFilters]);

	useEffect(() => {
		if (searchMode) {
			setSelectedFilters([]);
			//tömmer filter när man skriver i sökfältet
		}
	}, [searchMode]);

	// Skapa en lista med alla subkategorier, bara en av varje
	const subcategories: string[] = [
		...new Set(allButDrinks.flatMap((dish) => dish.subcategory)),
	];

	// Lägger till subkategorin i selectedFilters-arrayen om den klickas på, klickar man igen tas den bort
	const handleCategoryClick = (category: string) => {
		setSearchMode(false); // <- tömmer sökfältet
		const filteredList = updateSelectedFilters(selectedFilters, category);
		setSelectedFilters(filteredList);
	};

	return (
		<>
			{showFilters && (
				<div className='filter-select'>
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
							{!selectedFilters?.includes(subcategory)
								? subcategory
								: subcategory + 'X'}
						</button>
					))}
				</div>
			)}
		</>
	);
};

export default FilterMeals;
