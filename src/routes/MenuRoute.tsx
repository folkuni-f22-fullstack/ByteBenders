import Meals from '../components/Meals.jsx';
import SearchBar from '../components/SearchBar.tsx';
import DealsOfTheWeek from '../components/DealsOfTheWeek.tsx'

export default function MenuRoute() {
	return (
		<div className='MenuRoute'>
			<SearchBar />
            <DealsOfTheWeek />
            <Meals />
		</div>
	);
}
