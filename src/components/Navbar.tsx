import { PiForkKnifeFill } from "react-icons/pi";
import { BsCart3, BsInfoLg, BsFillPersonFill } from "react-icons/bs";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

// interface MenuLinkProps {
// 	linkto: string;
// 	icon: React.ReactNode;
// 	text: string;
// }

// const MenuLink: React.FC<MenuLinkProps> = ({ linkto, icon, text }) => {
// 	return (
// 		<div>
// 			<a href={linkto}>
// 				<div>{icon}</div>
// 				<p>{text}</p>
// 			</a>
// 		</div>
// 	);
// };

// const linkObjects = [
// 	{ icon: <PiForkKnifeFill />, text: 'Menu' },
// 	{ icon: <BsCart3 />, text: 'Cart' },
// 	{ icon: <BsInfoLg />, text: 'About' },
// 	{ icon: <BsFillPersonFill />, text: 'Log in' },
// ];

const NavBar = () => {
    return (
        <nav className="navbar">
            <NavLink to="menu">
                <PiForkKnifeFill />
            </NavLink>

            <NavLink to="cart">
                <BsCart3 />
            </NavLink>

            <NavLink to="information">
                <BsInfoLg />
            </NavLink>

            <NavLink to="login">
                <BsFillPersonFill />
            </NavLink>
        </nav>
    );
};

export default NavBar;
