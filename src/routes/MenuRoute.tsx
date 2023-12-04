import Meals from '../components/Meals.jsx';
import PopularThisWeek from '../components/PopularThisWeek.tsx';
import React from 'react';

export default function MenuRoute() {
	return (
		<div className='MenuRoute'>
			<PopularThisWeek />
			<Meals />
		</div>
	);
}
