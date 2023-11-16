import { NavLink } from "react-router-dom";
import { cartState } from "../recoil/cartNumberState.js";
import { useRecoilState } from "recoil";

// Skapar interface (=gränssnitt) som definierar vilka egenskaper och datatyper som förväntas.
interface MenuLinkProps {
  linkto: string;
  icon: React.ReactNode;
  text: string;
}

// Använder React.FC<MenuLinkProps> för att ange att MenuLink är en funktionell komponent som accepterar props enligt datatypen som anges av MenuLinkProps.
const MenuLink: React.FC<MenuLinkProps> = ({ linkto, icon, text }) => {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  return (
    <NavLink to={linkto}>
      <div className="nav-icon">
        {icon}
        <p className="nav-text">{text}</p>
        {text == "Cart" && cartItems > 0 && (
          <div className="cart-item-count">{cartItems}</div>
        )}
      </div>
    </NavLink>
  );
};

export default MenuLink;
