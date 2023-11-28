import DoneOrderCard from '../components/DoneOrderCard';
import '../styles/OrderCards.css';
import { useState } from 'react';

export default function DoneOrderRoute() {
	const [change, setChange] = useState(0);
	return (
		<>
			<div className='order-route-header'>
				<div className='order-page-employee'>
					<h1> Done Orders </h1>
				</div>
			</div>
			<DoneOrderCard change={change} setChange={setChange} />
		</>
	);
}
