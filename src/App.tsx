import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import "./styles/cartCard.css";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
