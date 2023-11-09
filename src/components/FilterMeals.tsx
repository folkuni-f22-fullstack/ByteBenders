import { useState, useEffect } from 'react';
import { Dish } from '../interfaces/dish';
import { FilterMealsProps } from '../interfaces/filterMealsProps';
import '../styles/filter.css';

const filterMenuBySubcategory = (
	selectedFilters: string[],
	list: Dish[],
	setListToShow: (list: Dish[] | null) => void
) => {
	// OM några filter är iklickade -> mappa genom filtren och plocka fram de objekten som matchar den subkategorin och stoppa in i ny filtrerad lista
	if (selectedFilters?.length > 0) {
		const filteredList = [] as Dish[];
		selectedFilters?.map((filter) => {
			const filteredItems: Dish[] = list.filter((item) => {
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
	selectedCategory,
	listToShow,
	setListToShow,
}) => {
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	const [showCategories, setShowCategories] = useState(false);

	useEffect(() => {
		// för varje item i selectedFilters, lägg till de rätterna som matchar subcategory
		filterMenuBySubcategory(selectedFilters, list, setListToShow);

		console.log('listToShow är: ', listToShow);
	}, [selectedFilters]);

	// Skapa en lista med alla subkategorier, bara en av varje
	const subcategories: string[] = [
		...new Set(list.flatMap((dish) => dish.subcategory)),
	];

	// Lägger till subkategorin selectedFilters-arrayen om den klickas på, klickar man igen tas den bort
	const handleCategoryClick = (category: string) => {
		if (selectedFilters?.includes(category)) {
			setSelectedFilters(
				selectedFilters.filter((filter: string) => filter !== category)
			);
		} else {
			setSelectedFilters([...selectedFilters, category]);
		}
	};

	return (
		<div
			className={
				selectedCategory == 'meals'
					? 'filter-container'
					: 'filter-container hidden'
			}
		>
			<button onClick={() => setShowCategories(!showCategories)}>
				Filter
			</button>
			{showCategories && selectedCategory == 'meals' && (
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
		</div>
	);
};

export default FilterMeals;
