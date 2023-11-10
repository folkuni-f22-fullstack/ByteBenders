import { useState, useEffect } from 'react';
import { Dish } from '../interfaces/dish';
import { FilterMealsProps } from '../interfaces/search-and-filter-props';

const filterMenuBySubcategory = (
	selectedFilters: string[],
	list: Dish[],
	setListToShow: (list: Dish[] | null) => void,
	allButDrinks: Dish[]
) => {
	// OM några filter är iklickade -> mappa genom filtren och plocka fram de objekten som matchar den subkategorin och stoppa in i ny filtrerad lista
	if (selectedFilters?.length > 0) {
		const filteredList = [] as Dish[];
		selectedFilters?.map((filter) => {
			const filteredItems: Dish[] = allButDrinks.filter((item) => {
				return item.subcategory.includes(filter);
			});

			filteredList.push(...filteredItems);
		});

		// Uppdatera listToShow till den filtrerade listan
		setListToShow(filteredList);
	} else {
		// ANNARS ->
		// Uppdatera listToShow till ursprungslistan
		setListToShow(list);
	}
};

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
		filterMenuBySubcategory(
			selectedFilters,
			list,
			setListToShow,
			allButDrinks
		);
	}, [selectedFilters]);

	useEffect(() => {
		if (searchMode) {
			setSelectedFilters([]);
		}
	}, [searchMode]);

	console.log('selectedFilters är: ', selectedFilters);

	// Skapa en lista med alla subkategorier, bara en av varje
	const subcategories: string[] = [
		...new Set(allButDrinks.flatMap((dish) => dish.subcategory)),
	];

	// Lägger till subkategorin selectedFilters-arrayen om den klickas på, klickar man igen tas den bort
	const handleCategoryClick = (category: string) => {
		setSearchMode(false);
		if (selectedFilters?.includes(category)) {
			setSelectedFilters(
				selectedFilters.filter((filter: string) => filter !== category)
			);
		} else {
			setSelectedFilters([...selectedFilters, category]);
		}
	};

	return (
		<>
			{showFilters && (
				<div className='filter-select'>
					{subcategories.map((category: string) => (
						<button
							key={category}
							onClick={() => handleCategoryClick(category)}
							className={
								selectedFilters?.includes(category)
									? 'selected-filter'
									: ''
							}
						>
							{!selectedFilters?.includes(category)
								? category
								: category + 'X'}
						</button>
					))}
				</div>
			)}
		</>
	);
};

export default FilterMeals;
