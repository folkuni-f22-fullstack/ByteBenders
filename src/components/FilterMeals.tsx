import { useState } from 'react';
import menuData from '../data/menu.json';
import { signal } from '@preact/signals-core';

interface CommonProps {
	image: string;
	id: number;
	name: string;
	price: number;
	category: string;
	comment: string;
}

interface Drinks extends CommonProps {
	category: string;
}

interface Meals extends CommonProps {
	subcategory: string;
	description: string;
	allergenes: string[];
	category: string;
}

type Dish = Drinks | Meals;

interface FilterMealsProps {
	list: Dish[];
}

const FilterMeals: React.FC<FilterMealsProps> = ({ list }) => {
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	// Skapa list-signal för vilka rätter som ska visas
	const listToShow = signal(list);

	// Skapa en lista med alla subkategorier, bara en av varje
	const subcategories: string[] = [
		...new Set(list.flatMap((dish) => dish.subcategory)),
	];

	console.log('subcategories är: ', subcategories);

	// När man klickar på filter ska alternativen expandera
	// Klickar man i ett filter ska listan uppdateras

	// const selectedFilters = [];

	const handleCategoryClick = (category: string) => {
		if (selectedFilters.includes(category)) {
			setSelectedFilters(
				selectedFilters.filter((filter) => filter !== category)
			);
		} else {
			setSelectedFilters([...selectedFilters, category]);
		}
	};

	console.log('selectedFilters är: ', selectedFilters);

	// Klickar man i ett till filter ska listan filtreras på båda de iklickade filtrena
	// De filter man klickat i ska synas på sidan och gå att klicka ur
	// När man klickar ur ett filter ska det filtret försvinna men de andra vara kvar
	// Om alla filter är urklickade ska listan gå tillbaka till ursprungslistan

	// const filterBySubCategory = () => {
	//     const filteredList = listToShow.value.filter((dish) => )
	// }

	return (
		<div className='filter-container'>
			<button>Filter</button>
			<div>
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
		</div>
	);
};

export default FilterMeals;
