import '../styles/login.css';

export default function LoginRoute() {
	return (
		<div className='LoginRoute'>
			<form action='#' className='login-form'>
				<div className='input-group'>
					<label htmlFor='user-input'>Employee-number</label>
					<input type='text' id='user-input' />
				</div>

				<div className='input-group'>
					<label htmlFor='password-input'>Password</label>
					<input type='text' id='password-input' />
				</div>

				<button className='login-button'>Log in</button>
			</form>
		</div>
	);
}
