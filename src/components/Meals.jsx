import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import '../styles/meals.css';
// import meal1 from "../assets/images/2.png";
// import meal2 from "../assets/images/3.png";
// import meal3 from "../assets/images/4.png";
import { NavLink } from 'react-router-dom';
import { searchList } from './SearchBar.tsx';

function Meals() {
	return (
		// <section className="meals-section">
		//   <div className="meals-card">
		//     <img src={meal1} alt="image of sushi" className="meals-img" />
		//     <div className="meals-text">
		//       <p className="meals-p">California roll 8st</p>
		//       <p className="meals-price">109 :-</p>
		//     </div>
		//     <button className="meals-btn">
		//       Add to cart <FiShoppingCart className="meals-cart" />
		//     </button>
		//   </div>

		//   <div className="meals-card">
		//     <img src={meal2} alt="image of sushi" className="meals-img" />
		//     <div className="meals-text">
		//       <p className="meals-p">California roll 8st</p>
		//       <p className="meals-price">109 :-</p>
		//     </div>
		//     <button className="meals-btn">
		//       Add to cart <FiShoppingCart className="meals-cart" />
		//     </button>
		//   </div>

		//   <div className="meals-card">
		//     <img src={meal3} alt="image of sushi" className="meals-img" />
		//     <div className="meals-text">
		//       <p className="meals-p">California roll 8st</p>
		//       <p className="meals-price">109 :-</p>
		//     </div>
		//     <button className="meals-btn">
		//       Add to cart <FiShoppingCart className="meals-cart" />
		//     </button>
		//   </div>
		//   <div className="meals-card">
		//     <img src={meal3} alt="image of sushi" className="meals-img" />
		//     <div className="meals-text">
		//       <p className="meals-p">California roll 8st</p>
		//       <p className="meals-price">109 :-</p>
		//     </div>
		//     <button className="meals-btn">
		//       Add to cart <FiShoppingCart className="meals-cart" />
		//     </button>
		//   </div>
		// </section>
		<>
			{searchList.value.map((menuItem, index) => (
				<div key={index}>
					<NavLink to={`/menu/${menuItem.id}`}>
						<p> {menuItem.name} </p>
					</NavLink>
				</div>
			))}
		</>
	);
}

export default Meals;
