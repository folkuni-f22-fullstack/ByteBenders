import Meals from '../components/Meals.jsx';
import SearchBar from '../components/SearchBar.tsx';

export default function MenuRoute() {
	return (
		<div className='MenuRoute'>
			<SearchBar />
			<Meals />
		</div>
	);
}
