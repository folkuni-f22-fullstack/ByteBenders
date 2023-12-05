import { NavLink } from 'react-router-dom';
import { cartState } from '../recoil/cartNumberState.js';
import { useRecoilState } from 'recoil';
import React from 'react';
import { MenuLinkProps } from '../interfaces/linkObject.js';

// Creates links for the navbar component
const MenuLink: React.FC<MenuLinkProps> = ({ linkto, icon, text }) => {
	const [cartItems, setCartItems] = useRecoilState<number>(cartState);

	return (
		<NavLink to={linkto}>
			<div className='nav-icon'>
				{icon}
				<p className='nav-text'>{text}</p>
				{text == 'Cart' && cartItems > 0 && (
					<div className='cart-item-count'>{cartItems}</div>
				)}
			</div>
		</NavLink>
	);
};

export default MenuLink;
