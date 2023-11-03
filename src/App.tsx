import './App.css';
import Meals from './components/Meals.jsx';
import CartCard from './components/CartCard.jsx';
import Details from './components/Details.jsx';
import Categories from './components/Categories.jsx';
import './App.css';
import './styles/cartCard.css';
import './App.css';
import NavBar from './components/NavBar.tsx';

function App() {
	return (
		<>
			<Categories />
			<Meals />
			<CartCard />
			<Details />
		</>
	);
}

export default App;
