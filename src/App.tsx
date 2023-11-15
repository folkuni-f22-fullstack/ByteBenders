import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import { Header } from "./components/Header.tsx";
import "./styles/cartCard.css";
import "./App.css";

function App() {

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
