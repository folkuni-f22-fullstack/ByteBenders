import { PiForkKnifeFill } from "react-icons/pi";
import { BsCart3, BsInfoLg, BsFillPersonFill } from "react-icons/bs";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

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
