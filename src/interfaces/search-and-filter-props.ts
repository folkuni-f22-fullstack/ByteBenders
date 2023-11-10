import { Dish } from './dish';

export interface SearchBarProps {
	list: Dish[];
	setListToShow: (list: Dish[] | null) => void;
	allButDrinks: Dish[];
}

export interface FilterMealsProps extends SearchBarProps {
	showFilters: boolean;
}
