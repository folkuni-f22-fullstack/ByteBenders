import ReceivedOrderCard from '../components/ReceivedOrderCard';
import '../styles/OrderCards.css';
import { BiSolidPencil } from 'react-icons/bi';
import React, { useState } from 'react';

export default function RecOrderRoute() {
	const [change, setChange] = useState<number>(0);

	return (
		<>
			<div className='order-route-header'>
				<div className='order-page-employee'>
					<h1 className='employee-h1'>
						{' '}
						Received Orders{' '}
						<BiSolidPencil className='employee-icon' />{' '}
					</h1>
				</div>
			</div>
			<ReceivedOrderCard change={change} setChange={setChange} />
		</>
	);
}
