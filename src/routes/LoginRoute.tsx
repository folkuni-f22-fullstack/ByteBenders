import { useState } from 'react';
import { signal } from '@preact/signals-react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '../styles/login.css';

export const loggedIn = signal(false);

export default function LoginRoute() {
	const [visible, setVisible] = useState(false);
	const [userInput, setUserInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const handleLogin = () => {
		if (loggedIn.value === true) {
			loggedIn.value = false;
		} else {
			if (userInput === '1234' && passwordInput === 'password') {
				loggedIn.value = true;
				setUserInput('');
				setPasswordInput('');
			} else {
				console.log('Wrong user or password');
			}
		}
	};

	return (
		<div className='LoginRoute'>
			<form action='#' className='login-form'>
				<div className='login-heading'>
					<h1>Login</h1>
				</div>
				<div className='input-group'>
					<label htmlFor='user-input'>Employee-number</label>
					<input
						type='text'
						id='user-input'
						value={userInput}
						onChange={(event) => setUserInput(event.target.value)}
					/>
				</div>

				<div className='input-group'>
					<label htmlFor='password-input'>Password</label>
					<div>
						<input
							type={visible ? 'text' : 'password'}
							id='password-input'
							value={passwordInput}
							onChange={(event) =>
								setPasswordInput(event.target.value)
							}
						/>
						<div
							className='visibility-toggle'
							onClick={() => setVisible(!visible)}
						>
							{visible ? <AiFillEyeInvisible /> : <AiFillEye />}
						</div>
					</div>
				</div>

				<button
					type='submit'
					className='login-button'
					onClick={handleLogin}
				>
					Log in
				</button>
			</form>
		</div>
	);
}
