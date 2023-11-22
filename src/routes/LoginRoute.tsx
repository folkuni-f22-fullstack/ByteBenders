import { useState, useRef, useEffect } from 'react';
import { signal } from '@preact/signals-react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/loginState.js';
import fetchAccount from '../utils/AJAX/fetchAccount.js';
import WindowSizeListener from '../utils/WindowListener.tsx';
import isValidLogin from '../utils/validateLogin.ts';

export const loggedIn = signal(false);

export default function LoginRoute() {
	const [visible, setVisible] = useState(false);
	const [userInput, setUserInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState);
	const navigate = useNavigate();
	const errorMsgRef = useRef(null);
	let windowWidth = WindowSizeListener();
	let textColor = windowWidth > 1200 ? 'var(--dark-blue)' : '#FFFFFF';

	const handleLogin = async () => {
		const inputsAreValid = isValidLogin(userInput, passwordInput);
		if (!inputsAreValid) {
			errorMsgRef.current.style.visibility = 'visible';
			return;
		}

		try {
			const login = await fetchAccount(userInput, passwordInput);

			if (!login.token) {
				errorMsgRef.current.value = login;

				errorMsgRef.current.style.visibility = 'visible';
			} else if (login.token) {
				errorMsgRef.current.style.visibility = 'hidden';
				setIsLoggedIn({ loggedIn: true, token: login.token });
				setUserInput('');
				setPasswordInput('');
				navigate('/recieved');
				let d = new Date();
				d.setTime(d.getTime() + 1 * 60 * 60 * 1000);
				document.cookie = `user_cookie=${JSON.stringify(
					login.token
				)}; expires=${d.toUTCString()}`;
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='LoginRoute'>
			<div className='img-div'></div>
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
					<div className='pass-div'>
						<input
							type={visible ? 'text' : 'password'}
							className='password-input'
							value={passwordInput}
							onChange={(event) =>
								setPasswordInput(event.target.value)
							}
						/>
						<div
							className='visibility-toggle'
							onClick={() => setVisible(!visible)}
						>
							{visible ? <AiFillEye /> : <AiFillEyeInvisible />}
						</div>
					</div>
				</div>

				<p
					ref={errorMsgRef}
					style={{ visibility: 'hidden', color: textColor }}
				>
					{' '}
					User or password not found..{' '}
				</p>
				<button
					type='button'
					className='login-button'
					onClick={handleLogin}
				>
					Log in
				</button>
			</form>
		</div>
	);
}
