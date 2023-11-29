import RecievedOrderCard from '../components/RecievedOrderCard';
import '../styles/OrderCards.css';
import { BiSolidPencil } from 'react-icons/bi';
import { useState } from 'react';

export default function RecOrderRoute() {
	const [change, setChange] = useState(0);

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
			<RecievedOrderCard change={change} setChange={setChange} />
		</>
	);
}
