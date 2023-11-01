import role from '../../images/role.png'
import salmon from '../../images/salmon.png'
function CartCard() {

	return (
		<section>

			<div className="cart-card-container">
				<div className="cart-card">
					<img className="cart-image" src={role} />
					<p className='cart-name'>Californa roll 8st</p>
					<p className='total-price'>218:-</p>
					<p className='sub-text'>Lorem ipsum</p>
					<div className='amount-container'>
						<button className='sub'>-</button>
						<p className='food-amount'>2</p>
						<button className='plus'>+</button>
					</div>
				</div>
				<button className='customize-order'>Customize your order +</button>
			</div>

			<div className="cart-card-container">
				<div className="cart-card">
					<img className="cart-image" src={salmon} />
					<p className='cart-name'>Salmon roll 8st</p>
					<p className='total-price'>258:-</p>
					<p className='sub-text'>Lorem ipsum</p>
					<div className='amount-container'>
						<button className='sub'>-</button>
						<p className='food-amount'>2</p>
						<button className='plus'>+</button>
					</div>
				</div>
				<button className='customize-order'>Customize your order +</button>
			</div>
		</section>
	)
}

export default CartCard