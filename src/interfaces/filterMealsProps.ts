import { Dish } from './dish';

export interface FilterMealsProps {
	list: Dish[];
	selectedCategory: string;
	listToShow: Dish[] | null;
	setListToShow: (list: Dish[] | null) => void;
}
