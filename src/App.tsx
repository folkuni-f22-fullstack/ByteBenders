import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import { Header } from "./components/Header.tsx";
import { useEffect } from "react";
import "./styles/cartCard.css";
import "./App.css";
import checkLoginState from "./utils/checkLoginState.ts";
import { useRecoilState } from 'recoil'
import { loginState } from './recoil/loginState.js'
import { testAuth } from '../src/utils/AJAX/testAuth.js'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState)

  useEffect(() => {
    checkLoginState(isLoggedIn, setIsLoggedIn)
  }, [])


  const location = useLocation()
  const showHeader = !'/information'.includes(location.pathname)
  return (
    <>
      {showHeader && <Header />}
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
