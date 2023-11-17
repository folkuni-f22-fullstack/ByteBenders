import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import { Header } from "./components/Header.tsx";
import { useEffect } from "react";
import "./styles/cartCard.css";
import "./App.css";
import checkLoginState from "./utils/checkLoginState.ts";
import { useRecoilState } from 'recoil'
import { loginState } from './recoil/loginState.js'
import { isOrderLocked, putOrder } from "./utils/fetch.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState)

  useEffect(() => {
    checkLoginState(isLoggedIn, setIsLoggedIn)
  }, [])

  let order = {
    _id: 1,
    status: 'current'
  }

  putOrder(order, 'current')

  useEffect(() => {
    async function fetchData() {
      try {
        
        await isOrderLocked(1)
      } catch (error) {
        
      }

    }
    fetchData()

  }, [])


  // {order.locked ? (
  //   <p>order is locked bla bla </p>
  // ) : (
  //   button 
  // )}

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
