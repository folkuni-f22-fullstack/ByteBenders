import { Dish } from "./dish";

export interface SearchBarProps {
  filteredDishes: Dish[]; // Rätter filtrerade efter kategori
  setListToShow: (filteredDishes: Dish[] | null) => void;
  fullMenu: Dish[]; //alla rätter
}

export interface FilterMealsProps extends SearchBarProps {
  searchMode: boolean;
  setSearchMode: (value: boolean) => void;
  fullMenu: Dish[];
  subMenuRef: HTMLButtonElement;
}
