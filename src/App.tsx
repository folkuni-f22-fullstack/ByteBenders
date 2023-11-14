import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import { Header } from "./components/Header.tsx";
import "./styles/cartCard.css";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
