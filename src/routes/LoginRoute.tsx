import { useState } from "react";
import { signal } from "@preact/signals-react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../recoil/loginState.js";

export const loggedIn = signal(false);

export default function LoginRoute() {
  const [visible, setVisible] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userInput === "1234" && passwordInput === "password") {
      setIsLoggedIn(true);
      setUserInput("");
      setPasswordInput("");
      navigate("/recieved");
    } else {
      console.log("Wrong user or password");
    }
    // console.log('isLoggedIn är: ', isLoggedIn);
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
