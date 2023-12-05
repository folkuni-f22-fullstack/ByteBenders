import { Dish } from './dish';

export interface SearchBarProps {
	list: Dish[]; // Dishes filtered by category
	setListToShow: (list: Dish[] | null) => void;
	fullMenu: Dish[]; //all dishes
	searchMode: boolean;
	setSearchMode: (value: boolean) => void;
}

export interface FilterMealsProps extends SearchBarProps {
	searchMode: boolean;
	setSearchMode: (value: boolean) => void;
	fullMenu: Dish[];
	subMenuRef: React.RefObject<HTMLButtonElement>;
}

export type SelectedFiltersProps = {
	selectedFilters: string[];
	handleRemoveFilter: (filter: string) => void;
};
