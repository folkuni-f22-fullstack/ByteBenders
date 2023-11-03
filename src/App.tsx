import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import "./styles/cartCard.css";
import "./App.css";
import RecievedOrderCard from "./components/RecievedOrderCard.tsx";

function App() {
    return (
        <>
            <NavBar />
            <Outlet />
            <RecievedOrderCard />
        </>
    );
}

export default App;
