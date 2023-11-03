import { addToCart } from "../routes/ProductDetailsRoute.tsx";

function CartCard() {

	return (
		<section>
			<div className="cart-card-container">
				{addToCart.value.map(item => (
					<div className="cart-card" key={item.name}>
						<img className="cart-image" src={item.image} />
						<p className='cart-name'> {item.name} </p>
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