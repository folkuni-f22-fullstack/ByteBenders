import { addToCart } from "../routes/ProductDetailsRoute.tsx";
import { NavLink } from 'react-router-dom';

// <>
// {menuData.map((menuItem, index) => (
// 	<div key={index}>
// 		<NavLink to={`/menu/${menuItem.id}`}>
// 			<p> {menuItem.name} </p>
// 		</NavLink>
// 	</div>
// ))}
// </>
// `/menu/${menuItem.id}`

function CartCard() {

	return (
		<section>
			<div className="cart-card-container">
				{addToCart.value.map((item, index) => (
					<div className="cart-card" key={index}>
						<NavLink to={`/menu/${item.id}`}>
							<img className="cart-image" src={item.image} />
						</NavLink>
						<NavLink to={`/menu/${item.id}`} className='cart-name'> {item.name} </NavLink>
						<p className='sub-text'>Lorem ipsum</p>
						<p className='total-price'> {item.price}:- </p>
						<div className='amount-container'>
							<button className='sub'>-</button>
							<p className='food-amount'>2</p>
							<button className='plus'>+</button>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default CartCard