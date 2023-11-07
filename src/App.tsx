import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import "./styles/cartCard.css";
import "./App.css";
import OrderStatusCustomer from "./components/OrderStatusCustomer.tsx";

function App() {
  return (
    <>
      <NavBar />
      {/* <Outlet /> */}
      <OrderStatusCustomer />
    </>
  );
}

export default App;
