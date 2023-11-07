import { PiForkKnifeFill } from 'react-icons/pi';
import { BsCart3, BsInfoLg, BsFillPersonFill } from 'react-icons/bs';
import { BiSolidPencil } from 'react-icons/bi';
import { GrUnorderedList } from 'react-icons/gr';
import { MdDone, MdLogout } from 'react-icons/md';

// Ikoner för navbaren utan inloggning
const linkObjects = [
	{ icon: <PiForkKnifeFill />, text: 'Menu', to: 'menu' },
	{ icon: <BsCart3 />, text: 'Cart', to: 'cart' },
	{ icon: <BsInfoLg />, text: 'About', to: 'information' },
	{ icon: <BsFillPersonFill />, text: 'Log in', to: 'login' },
];

// Ikoner för navbaren efter inloggning
const linkObjectsLoggedIn = [
	{ icon: <BiSolidPencil />, text: 'Received', to: '' },
	{ icon: <GrUnorderedList />, text: 'Current', to: '' },
	{ icon: <MdDone />, text: 'Done', to: '' },
	{ icon: <MdLogout />, text: 'Log out', to: '#' },
];

export { linkObjects, linkObjectsLoggedIn };
