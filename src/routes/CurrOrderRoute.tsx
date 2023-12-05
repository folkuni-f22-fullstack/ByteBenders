import CurrentOrderCard from '../components/CurrentOrdersCard';
import '../styles/OrderCards.css';
import { useState } from 'react';
import { GrUnorderedList } from 'react-icons/gr';
import React from 'react';

export default function CurrOrderRoute() {
	const [change, setChange] = useState<number>(0);

	return (
		<>
			<div className='order-route-header'>
				<div className='order-page-employee'>
					<h1 className='employee-h1'>
						{' '}
						Current Orders{' '}
						<GrUnorderedList className='employee-icon' />{' '}
					</h1>
				</div>
			</div>
			<CurrentOrderCard change={change} setChange={setChange} />
		</>
	);
}
