import { Dish } from './dish';

export interface SearchBarProps {
	list: Dish[]; // Rätter filtrerade efter kategori
	setListToShow: (list: Dish[] | null) => void;
	fullMenu: Dish[]; //alla rätter
	searchMode: boolean;
	setSearchMode: (value: boolean) => void;
}

export interface FilterMealsProps extends SearchBarProps {
	searchMode: boolean;
	setSearchMode: (value: boolean) => void;
	fullMenu: Dish[];
	subMenuRef: HTMLButtonElement;
}

export type SelectedFiltersProps = {
	selectedFilters: string[];
	handleRemoveFilter: (filter: string) => void;
};
