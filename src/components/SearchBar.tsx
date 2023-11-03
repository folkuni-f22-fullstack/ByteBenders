import { signal } from '@preact/signals-react';
import menu from '../data/menu.json';
import dishMatch from '../utils/search.ts';

const searchString = signal('');
const fullMenu = signal(menu);
export const searchList = signal(fullMenu.value);

const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
	searchString.value = event.target.value;
	if (searchString.value) {
		searchList.value = fullMenu.value.filter((dish) =>
			dishMatch(dish.name, searchString.value)
		);
	} else {
		searchList.value = fullMenu.value;
	}
};

const SearchBar = () => {
	return (
		<input type='text' id='search-input' onChange={handleSearchChange} />
	);
};

export default SearchBar;
