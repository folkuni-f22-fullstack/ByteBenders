import { Dish } from './dish';

export type MealCardProps = {
	menuItem: Dish;
	handleAddToCart: (_id: number) => void;
};
