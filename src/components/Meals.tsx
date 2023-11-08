import menuData from "../data/menu.json";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import "../styles/meals.css";
import "../styles/categories.css";
import CartRoute from "../routes/CartRoute";
import addToLS from "../utils/addCartLS";
import { quantity } from "../utils/addCartLS";

const Meals = () => {
  const [selectedCategory, setSelectedCartegory] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const filteredItems = menuData.filter((item) =>
    selectedCategory ? item.category === selectedCategory : true
  );

  useEffect(() => {
    // Lägg till en eventlyssnare för att upptäcka fönsterstorleksändringar
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Ta bort eventlyssnaren när komponenten rensas
    return () => {
      window.removeEventListener("resize", handleResize)
    };
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
    <section className="meals-main">
      <section className="meals-section">
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
        {filteredItems.map((menuItem) => (
          <div key={menuItem.id} className="meals-card">
            <NavLink to={`/menu/${menuItem.id}`} className="meals-link" onClick={refreshQuantity}>
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
            <button className="meals-btn" onClick={() => handleAddToCart(menuItem.id)}>
              Add to cart <BsCart3 className="btn-icon" />
            </button>
          </div>
        ))}
      </section>
      {windowWidth > 1200 ? (
        <div className="cart-route-container">
          <CartRoute />
        </div>
      ) : null}
    </section>
  );
};
export default Meals;
