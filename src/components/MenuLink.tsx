import { NavLink } from 'react-router-dom';

// Skapar interface (=gränssnitt) som definierar vilka egenskaper och datatyper som förväntas.
interface MenuLinkProps {
	linkto: string;
	icon: React.ReactNode;
	text: string;
}

// Använder React.FC<MenuLinkProps> för att ange att MenuLink är en funktionell komponent som accepterar props enligt datatypen som anges av MenuLinkProps.
const MenuLink: React.FC<MenuLinkProps> = ({ linkto, icon, text }) => {
	return (
		<NavLink to={linkto} activeClassName='active'>
			<div className='nav-icon'>{icon}</div>
			<p className='nav-text'>{text}</p>
		</NavLink>
	);
};

export default MenuLink;
