import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '../styles/login.css';

export default function LoginRoute() {
	const [visible, setVisible] = useState(false);

	return (
		<div className='LoginRoute'>
			<form action='#' className='login-form'>
				<div className='login-heading'>
					<h1>Login</h1>
				</div>
				<div className='input-group'>
					<label htmlFor='user-input'>Employee-number</label>
					<input type='text' id='user-input' />
				</div>

				<div className='input-group'>
					<label htmlFor='password-input'>Password</label>
					<div>
						<input
							type={visible ? 'text' : 'password'}
							id='password-input'
						/>
						<div
							className='visibility-toggle'
							onClick={() => setVisible(!visible)}
						>
							{visible ? <AiFillEyeInvisible /> : <AiFillEye />}
						</div>
					</div>
				</div>

				<button type='submit' className='login-button'>
					Log in
				</button>
			</form>
		</div>
	);
}
