import { useState, useRef } from 'react';
import { signal } from '@preact/signals-react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { loginState } from '../recoil/loginState.js'
import fetchAccount from '../utils/AJAX/fetchAccount.js'

export const loggedIn = signal(false);

export default function LoginRoute() {
	const [visible, setVisible] = useState(false);
	const [userInput, setUserInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState)
	const navigate = useNavigate();
  const errorMsgRef = useRef(null)

	const handleLogin = async () => {

		try {
			const login = await fetchAccount( userInput, passwordInput )

      if (!login.token) {
        errorMsgRef.current.style.visibility = 'visible';
      }
      
			
			else if ( login.token) {
        errorMsgRef.current.style.visibility = 'hidden';
				setIsLoggedIn({ loggedIn: true, token: login.token})
				setUserInput('');
				setPasswordInput('');
				navigate("/recieved")
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

        <p ref={errorMsgRef} style={{ visibility: 'hidden', color: '#FFFFFF' }}> User or password not found.. </p>
        <button type="button" className="login-button" onClick={handleLogin}>
          Log in
        </button>
      </form>
    </div>
  );
}
