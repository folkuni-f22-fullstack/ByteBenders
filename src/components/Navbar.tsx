import { PiForkKnifeFill } from 'react-icons/pi';
import { BsCart3, BsInfoLg, BsFillPersonFill } from 'react-icons/bs';
import '../styles/navbar.css';

const NavBar = () => {
	return (
		<nav className='navbar'>
			<a href='#'>
				<PiForkKnifeFill />
			</a>
			<a href='#'>
				<BsCart3 />
			</a>
			<a href='#'>
				<BsInfoLg />
			</a>
			<a href='#'>
				<BsFillPersonFill />
			</a>
		</nav>
	);
};

export default NavBar;
