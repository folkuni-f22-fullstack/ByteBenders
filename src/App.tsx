import './App.css'
import './components/RecievedOrderCard.tsx'
import RecievedOrderCard from './components/RecievedOrderCard.tsx'
import "./App.css";
import Meals from "./components/Meals.jsx";

function App() {
  return (
    <>
      <RecievedOrderCard />
      <Meals />
    </>
  );
}

export default App;
