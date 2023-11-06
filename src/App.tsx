import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import "./styles/cartCard.css";
import "./App.css";
import CustomerStatusOrder from "./components/CustomerStatusOrder.tsx";

function App() {
  return (
    <>
      <NavBar />
      {/* <Outlet /> */}
      <CustomerStatusOrder />
    </>
  );
}

export default App;
