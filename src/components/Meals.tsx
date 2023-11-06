import menuData from "../data/menu.json";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import "../styles/meals.css";
import "../styles/categories.css";

const Meals = () => {
  const [selectedCategory, setSelectedCartegory] = useState("");

  const filteredItems = menuData.filter((item) =>
    selectedCategory ? item.category === selectedCategory : true
  );

  return (
    <>
      <section className="category-text-section">
        <h4 className="category-header">Categories</h4>
        <p className="category-text">
          Select a category to explore our menu items
        </p>
      </section>
      <section className="category-button-section">
        <button
          onClick={() => setSelectedCartegory("meals")}
          className="category-button"
        >
          Meals
        </button>
        <button
          onClick={() => setSelectedCartegory("sides")}
          className="category-button"
        >
          Sides
        </button>
        <button
          onClick={() => setSelectedCartegory("drinks")}
          className="category-button"
        >
          Drinks
        </button>
      </section>
      <section className="meals-section">
        {filteredItems.map((menuItem) => (
          <div key={menuItem.id} className="meals-card">
            <NavLink to={`/menu/${menuItem.id}`} className="meals-link">
              <img
                src={menuItem.image}
                alt={`image of ${menuItem.name}`}
                className="meals-img"
              />
              <div className="meals-text">
                <p>{menuItem.name}</p>
                <p className="meals-price">{menuItem.price} :-</p>
              </div>
            </NavLink>
            <button className="meals-btn">
              Add to cart <BsCart3 className="btn-icon" />
            </button>
          </div>
        ))}
      </section>
    </>
  );
};
export default Meals;
