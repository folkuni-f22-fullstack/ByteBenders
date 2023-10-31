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
					<p className='price'>109:-</p>
					<div className='amount-container'>
						<button className='sub'>-</button>
						<p className='amount'>2</p>
						<button className='plus'>+</button>
					</div>
				</div>
			</div>

			<div className="cart-card-container">
				<div className="cart-card">
					<img className="cart-image" src={salmon} />
					<p className='cart-name'>Salmon roll 8st</p>
					<p className='total-price'>258:-</p>
					<p className='sub-text'>Lorem ipsum</p>
					<p className='price'>129:-</p>
					<div className='amount-container'>
						<button className='sub'>-</button>
						<p className='amount'>2</p>
						<button className='plus'>+</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CartCard