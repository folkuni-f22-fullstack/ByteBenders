import React, { useState, useRef } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/loginState.js';
import fetchAccount from '../utils/AJAX/fetchAccount.js';
import WindowSizeListener from '../utils/WindowListener.tsx';
import isValidLogin from '../utils/validateLogin.ts';
import { loginStateType } from '../interfaces/loginStateType.ts';

export default function LoginRoute() {
	const [visible, setVisible] = useState<boolean>(false);
	const [userInput, setUserInput] = useState<string>('');
	const [passwordInput, setPasswordInput] = useState<string>('');
	const [isLoggedIn, setIsLoggedIn] =
		useRecoilState<loginStateType>(loginState);
	const navigate = useNavigate();
	const errorMsgRef = useRef<HTMLParagraphElement | null>(null);
	let windowWidth = WindowSizeListener();
	let textColor = windowWidth > 1200 ? 'var(--dark-blue)' : '#FFFFFF';

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const inputsAreValid = isValidLogin(userInput, passwordInput);
		if (!inputsAreValid) {
			errorMsgRef.current!.style.visibility = 'visible';
			return;
		}

		try {
			const login = await fetchAccount(userInput, passwordInput);

			if (!login.token) {
				errorMsgRef.current!.innerText = login;

				errorMsgRef.current!.style.visibility = 'visible';
			} else if (login.token) {
				errorMsgRef.current!.style.visibility = 'hidden';
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
			<form
				action='#'
				className='login-form'
				onSubmit={(event) => handleLogin(event)}
			>
				<div className='login-heading'>
					<h1>Login</h1>
				</div>
				<div className='input-group'>
					<label htmlFor='user-input'>Employee-Name</label>
					<input
						type='text'
						id='user-input'
						value={userInput}
						onChange={(event) => setUserInput(event.target.value)}
					/>
				</div>

				<div className='input-group'>
					<label htmlFor='password-input' className='password-label'>
						Password
					</label>
					<div className='pass-div'>
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
					type='submit'
					className='login-button'
					// onClick={(event) => handleLogin(event)}
				>
					Log in
				</button>
			</form>
		</div>
	);
}
