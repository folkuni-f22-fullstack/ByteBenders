import { useState } from 'react';
import { signal, effect } from '@preact/signals-core';
import '../styles/filter.css';

interface Dish {
	image: string;
	id: number;
	name: string;
	price: number;
	category: string;
	comment: string;
	subcategory: string;
	description: string;
	allergenes: string[];
}

// interface Meals extends CommonProps {
// 	category: string;
// }

// type Dish = Drinks | Meals;
// type Dish = Meals;

interface FilterMealsProps {
	list: Dish[];
	selectedCategory: string;
}

const FilterMeals: React.FC<FilterMealsProps> = ({
	list,
	selectedCategory,
}) => {
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	const [showCategories, setShowCategories] = useState(false);

	// Skapa list-signal för vilka rätter som ska visas
	const listToShow = signal(list);

	// Skapa en lista med alla subkategorier, bara en av varje
	const subcategories: string[] = [
		...new Set(list.flatMap((dish) => dish.subcategory)),
	];

	// Lägger till subkategorin selectedFilters-arrayen om den klickas på, klickar man igen tas den bort
	const handleCategoryClick = (category: string) => {
		if (selectedFilters.includes(category)) {
			setSelectedFilters(
				selectedFilters.filter((filter) => filter !== category)
			);
		} else {
			setSelectedFilters([...selectedFilters, category]);
		}
	};

	effect(() => {
		// för varje item i selectedFilters, lägg till de rätterna som matchar subcategory
		if (selectedFilters.length > 0) {
			const filteredList = [] as Dish[];
			selectedFilters.map((filter) => {
				const filteredItems: Dish[] = list.filter((item) => {
					return item.subcategory.includes(filter);
				});

				filteredList.push(...filteredItems);
			});

			// Uppdatera listToShow till den filtrerade listan
			listToShow.value = filteredList;
		} else {
			listToShow.value = list;
		}
	});

	// console.log('listToShow är: ', listToShow.value);
	console.log('selectedCategory är: ', selectedCategory);

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
					{subcategories.map((category) => (
						<button
							key={category}
							onClick={() => handleCategoryClick(category)}
							className={
								selectedFilters.includes(category)
									? 'selected-filter'
									: ''
							}
						>
							{!selectedFilters.includes(category)
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
