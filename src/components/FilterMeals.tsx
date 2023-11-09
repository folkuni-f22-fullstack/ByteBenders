import { useState, useEffect } from 'react';
import { signal, effect } from '@preact/signals-react';
import '../styles/filter.css';
// import { listToShow } from './Meals.tsx';
import { Signal } from '@preact/signals-react';

export interface Dish {
	image: string;
	id: number;
	name: string;
	price: number;
	category: string;
	comment: string;
	subcategory: string[];
	description: string;
	allergenes: string[];
}

export const listToShow: Signal<Dish[] | null> = signal(null);

interface FilterMealsProps {
	list: Dish[];
	selectedCategory: string;
	// listToShow: Signal<Dish[]>;
	// listToShow: Dish[];
}

const FilterMeals: React.FC<FilterMealsProps> = ({
	list,
	selectedCategory,
	// listToShow,
}) => {
	// const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	const [showCategories, setShowCategories] = useState(false);
	listToShow.value = list;
	const selectedFilters: Signal<string[] | null> = signal(null);

	effect(() => {
		// för varje item i selectedFilters, lägg till de rätterna som matchar subcategory
		if (selectedFilters.value?.length) {
			if (selectedFilters.value?.length > 0) {
				const filteredList = [] as Dish[];
				selectedFilters.value?.map((filter) => {
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
		}
	});

	// Skapa en lista med alla subkategorier, bara en av varje
	const subcategories: string[] = [
		...new Set(list.flatMap((dish) => dish.subcategory)),
	];

	// Lägger till subkategorin selectedFilters-arrayen om den klickas på, klickar man igen tas den bort
	// const handleCategoryClick = (category: string) => {
	// 	if (selectedFilters.includes(category)) {
	// 		setSelectedFilters(
	// 			selectedFilters.filter((filter) => filter !== category)
	// 		);
	// 	} else {
	// 		setSelectedFilters([...selectedFilters, category]);
	// 	}
	// };
	const handleCategoryClick = (category: string) => {
		if (selectedFilters.value?.includes(category)) {
			selectedFilters.value = selectedFilters.value.filter(
				(filter: string) => filter !== category
			);
		} else {
			selectedFilters.value = [...selectedFilters.value, category];
		}
	};

	// console.log('listToShow är: ', listToShow.value);
	// console.log('selectedCategory är: ', selectedCategory);

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
								selectedFilters.value?.includes(category)
									? 'selected-filter'
									: ''
							}
						>
							{!selectedFilters.value?.includes(category)
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
