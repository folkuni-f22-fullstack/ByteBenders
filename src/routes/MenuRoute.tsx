import Meals from '../components/Meals.jsx';
import PopularThisWeek from '../components/PopularThisWeek.tsx';

export default function MenuRoute() {
	return (
		<div className='MenuRoute'>
			<PopularThisWeek />
			<Meals />
		</div>
	);
}
