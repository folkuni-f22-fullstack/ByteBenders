import "../styles/meals.css";
import { BsCart3 } from "react-icons/bs";
import { useEffect, useState } from "react";
import displayMeals from "../utils/popular.ts";
import { NavLink } from "react-router-dom";
import addToLS from "../utils/addCartLS";
import { quantity } from "../utils/addCartLS";

export default function PopularThisWeek() {
  const [randomMeals, setRandomMeals] = useState([]);

  useEffect(() => {
    displayMeals(randomMeals, setRandomMeals);
  }, []);

  // Set value to 1
  function refreshQuantity() {
    quantity.value = 1
  }

  // Add to local storage
  function handleAddToCart(id) {
    addToLS(id)
  }

  return (
    <>
      <h1 className="most-popular-title">Most popular this week</h1>
      <section className="popular-section snaps-inline">
        {randomMeals &&
          randomMeals.map((menuItem) => (
            <div className="meals-card" key={menuItem.id}>
              <NavLink to={`/menu/${menuItem.id}`} className="meals-link">
                <img
                  src={menuItem.image}
                  alt={`image of ${menuItem.name}`}
                  className="meals-img"
                  onClick={refreshQuantity}
                />
                <div className="meals-text">
                  <p>{menuItem.name}</p>
                  <p className="meals-price">{menuItem.price} :-</p>
                </div>
              </NavLink>
              <button
                className="meals-btn"
                onClick={() => handleAddToCart(menuItem.id)}
              >
                Add to cart <BsCart3 className="btn-icon" />
              </button>
            </div>
          ))}
      </section>
    </>
  )
}
