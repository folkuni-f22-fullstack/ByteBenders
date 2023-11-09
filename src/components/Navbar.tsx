import { useRef } from 'react';
import { linkObjects, linkObjectsLoggedIn } from '../constants/nav-links.tsx';
import '../styles/navbar.css';
import MenuLink from './MenuLink.tsx';
import { loggedIn } from '../routes/LoginRoute.tsx';
import { effect, signal } from '@preact/signals-react';
import { useNavigate } from 'react-router-dom'
// variabel för att spara vilka ikoner som ska synas på navbaren
const linksToShow = signal(linkObjects);

// Uppdaterar vilka ikoner som ska synas beroende på vilket värde loggedIn-variabeln har
effect(() => {
	if (loggedIn.value === true) {
		linksToShow.value = linkObjectsLoggedIn;
	} else if (loggedIn.value === false) {
		linksToShow.value = linkObjects;
	}
});

const NavBar = () => {
	const navigate = useNavigate()
	const modal = useRef<HTMLDialogElement | null>(null);

	const handleLogout = () => {
		closeModal();
		loggedIn.value = false;
		navigate("")
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
			{linksToShow.value.map((link) => (
				<div key={link.text} className='link-container'>
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
