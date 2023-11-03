import "./App.css";
import Meals from "./components/Meals.jsx";

function App() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default App;
