import { useRef, useState, useEffect } from 'react';
import '../styles/navbar.css';
import MenuLink from './MenuLink.tsx';
import { useNavigate } from 'react-router-dom';
import { PiForkKnifeFill } from 'react-icons/pi';
import { BsCart3, BsInfoLg, BsFillPersonFill } from 'react-icons/bs';
import { BiSolidPencil } from 'react-icons/bi';
import { GrUnorderedList } from 'react-icons/gr';
import { MdDone, MdLogout } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/loginState.js';
import { cartState } from '../recoil/cartNumberState.js';
import { getCartQuantity } from '../utils/general.ts';
import { deleteCookie } from '../utils/cookieHandler.ts';
import { linkObject } from '../interfaces/linkObject.ts';
import { loginStateType } from '../interfaces/loginStateType.ts';

const NavBar = () => {
	const [isLoggedIn, setIsLoggedIn] =
		useRecoilState<loginStateType>(loginState);
	const [cartItems, setCartItems] = useRecoilState(cartState);
	const [linksToShow, setLinksToShow] = useState<linkObject[]>([]);
	const navigate = useNavigate();
	const modal = useRef<HTMLDialogElement | null>(null);

	// Lägger in antal i kundvagn vid komponent-mount
	useEffect(() => {
		setCartItems(getCartQuantity());
	});

	// Ikoner för navbaren utan inloggning
	const linkObjects: linkObject[] = [
		{ icon: <PiForkKnifeFill />, text: 'Menu', to: 'menu' },
		{ icon: <BsCart3 />, text: `Cart`, to: 'cart', class: 'cart' },
		{ icon: <BsInfoLg />, text: 'About', to: 'information' },
		{ icon: <BsFillPersonFill />, text: 'Log in', to: 'login' },
	];

	// Ikoner för navbaren efter inloggning
	const linkObjectsLoggedIn: linkObject[] = [
		{ icon: <BiSolidPencil />, text: 'Received', to: 'recieved' },
		{ icon: <GrUnorderedList />, text: 'Current', to: 'current' },
		{ icon: <MdDone />, text: 'Done', to: 'done' },
		{ icon: <MdLogout />, text: 'Log out', to: '#' },
	];

	useEffect(() => {
		setLinksToShow(isLoggedIn.loggedIn ? linkObjectsLoggedIn : linkObjects);
	}, [isLoggedIn.loggedIn, cartItems]);

	const handleLogout = () => {
		closeModal();
		setIsLoggedIn({ loggedIn: false });
		deleteCookie();
		navigate('');
	};

	const confirmLogout = () => {
		modal.current?.showModal();
	};

	const closeModal = () => {
		modal.current?.close();
	};

	const outsideClick = (e: React.MouseEvent) => {
		const dialogDimensions = modal.current?.getBoundingClientRect();
		if (dialogDimensions) {
			if (
				e.clientX < dialogDimensions.left ||
				e.clientX > dialogDimensions.right ||
				e.clientY < dialogDimensions.top ||
				e.clientY > dialogDimensions.bottom
			) {
				closeModal();
			}
		}
	};

	return (
		<nav className='navbar'>
			{linksToShow &&
				linksToShow.map((link: linkObject) => (
					<div
						key={link.text}
						className={
							link.class
								? 'link-container ' + link.class
								: 'link-container'
						}
					>
						{link.text === 'Log out' ? (
							<button onClick={confirmLogout}>
								<MenuLink
									linkto={link.to}
									icon={link.icon}
									text={link.text}
								/>
							</button>
						) : (
							<MenuLink
								linkto={link.to}
								icon={link.icon}
								text={link.text}
							/>
						)}
					</div>
				))}

			<dialog
				className='modal'
				ref={modal}
				onClick={(e) => {
					outsideClick(e);
				}}
			>
				<p>Log out?</p>
				<button onClick={handleLogout}>Confirm</button>
			</dialog>
		</nav>
	);
};

export default NavBar;
