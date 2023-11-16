import { useState } from 'react';
import { signal } from '@preact/signals-react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { loginState } from '../recoil/loginState.js'
import fetchAccount from '../utils/AJAX/fetchAccount.js'
import { saveCookie } from "../utils/cookieHandler.ts";
import { testAuth } from '../utils/AJAX/testAuth.js'

export const loggedIn = signal(false);

export default function LoginRoute() {
	const [visible, setVisible] = useState(false);
	const [userInput, setUserInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState)
	const navigate = useNavigate();

	const handleLogin = async () => {
		// if (userInput === '1234' && passwordInput === 'password') {
		// 	setIsLoggedIn(true);
		// 	setUserInput('');
		// 	setPasswordInput('');
		// 	navigate("/recieved")
		// } else {
		// 	console.log('Wrong user or password');
		// }
		// console.log('isLoggedIn är: ', isLoggedIn);

		try {
			// Försök logga in mha ajax
			const login = await fetchAccount( userInput, passwordInput )
			
			console.log(login);
			
			if ( login.token) {
				setIsLoggedIn({ loggedIn: true, token: login.token})
				setUserInput('');
				setPasswordInput('');
				navigate("/recieved")
				console.log('login success');
				// saveCookie(login.token)
				let d = new Date();
				d.setTime(d.getTime() + 1 * 60 * 60 * 1000);
				document.cookie = `user_cookie=${JSON.stringify(
					login.token
				)}; expires=${d.toUTCString()}`;
			}
			// Om lyckas sätt recoilstate till inloggad
		} catch (error) {
			// 
		}

	};

  return (
    <div className="LoginRoute">
      <div className="img-div"></div>
      <form action="#" className="login-form">
        <div className="login-heading">
          <h1>Login</h1>
        </div>
        <div className="input-group">
          <label htmlFor="user-input">Employee-number</label>
          <input
            type="text"
            id="user-input"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password-input">Password</label>
          <div className="pass-div">
            <input
              type={visible ? "text" : "password"}
              className="password-input"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
            />
            <div
              className="visibility-toggle"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
        </div>

        <button type="button" className="login-button" onClick={handleLogin}>
          Log in
        </button>
      </form>
    </div>
  );
}
