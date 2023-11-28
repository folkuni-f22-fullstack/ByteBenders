import DoneOrderCard from '../components/DoneOrderCard';
import '../styles/OrderCards.css';
import { MdDone } from 'react-icons/md';
import { useState } from 'react';

export default function DoneOrderRoute() {
	const [change, setChange] = useState(0);
	return (
		<>
			<div className='order-route-header'>
				<div className='order-page-employee'>
					<h1 className='employee-h1'>
						{' '}
						Done Orders <MdDone className='employee-icon-done' />{' '}
					</h1>
				</div>
			</div>
			<DoneOrderCard change={change} setChange={setChange} />
		</>
	);
}
