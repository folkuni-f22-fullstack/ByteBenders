import Meals from './components/Meals.jsx';
import CartCard from './components/CartCard.jsx';
import Details from './components/Details.jsx';
import NavBar from './components/NavBar.tsx';
import './styles/cartCard.css';
import './App.css';

function App() {
	return (
		<>
			<NavBar />
			<Meals />
			<CartCard />
			<Details />
		</>
	);
}

export default App;
