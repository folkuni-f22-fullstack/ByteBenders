import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import { Header } from "./components/Header.tsx";
import { useEffect } from "react";
import "./styles/cartCard.css";
import "./App.css";
import checkLoginState from "./utils/checkLoginState.ts";
import { useRecoilState } from "recoil";
import { loginState } from "./recoil/loginState.js";
import axios from "axios";
import { menuState } from "./recoil/menuState.js";
import { Dish } from "./interfaces/dish.ts";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState);
  const [fullMenu, setFullMenu] = useRecoilState<Dish[]>(menuState);

  useEffect(() => {
    checkLoginState(isLoggedIn, setIsLoggedIn);
  }, []);

  useEffect(() => {
    axios
      .get("/api/meals")
      .then((response) => setFullMenu(response.data))
      .catch((error) => console.error("error feching meals", error));
  }, []);

  const location = useLocation();
  const showHeader = !"/information".includes(location.pathname);
  return (
    <>
      {showHeader && <Header />}
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
