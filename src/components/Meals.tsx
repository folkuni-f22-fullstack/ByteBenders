import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import "../styles/meals.css";
import "../styles/categories.css";
import CartRoute from "../routes/CartRoute";
import addToLS from "../utils/addCartLS";
import { Dish } from "../interfaces/dish.ts";
import SearchBar from "./SearchBar.tsx";
import { filterByCategory } from "../utils/filter.ts";
import { useRecoilState } from "recoil";
import { isCartEmptyState } from "../recoil/cartNumberState.js";
import WindowSizeListener from "../utils/WindowListener.tsx";
import { menuState } from "../recoil/menuState.js";
// import { signal } from "@preact/signals-react";

const Meals = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [listToShow, setListToShow] = useState<Dish[]>([]);
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartCopy, setCartCopy] = useState([...cartData]);
  const [isCartEmpty, setIsCartEmpty] = useRecoilState(isCartEmptyState);
  const [errorMessage, setErrorMessage] = useState("");
  const [fullMenu, setFullMenu] = useRecoilState<Dish[]>(menuState);

  useEffect(() => {
    setListToShow(filteredItems);
  }, [selectedCategory]);

  // Ursprungslistan som skickas med till sök och filter-funktionerna
  const filteredItems: Dish[] = filterByCategory(selectedCategory, fullMenu);

  const windowWidth = WindowSizeListener();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Set value to 1
  function refreshQuantity() {
    quantity.value = 1;
  }

  // Add to local storage
  async function handleAddToCart(id: number) {
    await addToLS(id, "/api/meals");
    setIsCartEmpty(!isCartEmpty);
  }

  return (
    <section className="meals-main">
      <section className="meals-section">
        <section className="searchbar-section">
          <SearchBar
            list={filteredItems}
            setListToShow={(newList) => setListToShow(newList || [])}
            fullMenu={fullMenu}
          />
        </section>
        <section className="category-button-section">
          <button
            onClick={() => handleCategoryClick("")}
            className={
              selectedCategory === ""
                ? "category-button selected"
                : "category-button"
            }
          >
            All
          </button>
          <button
            onClick={() => handleCategoryClick("meals")}
            className={
              selectedCategory === "meals"
                ? "category-button selected"
                : "category-button"
            }
          >
            Meals
          </button>
          <button
            onClick={() => handleCategoryClick("s_ides")}
            className={
              selectedCategory === "s_ides"
                ? "category-button selected"
                : "category-button"
            }
          >
            Sides
          </button>
          <button
            onClick={() => handleCategoryClick("drinks")}
            className={
              selectedCategory === "drinks"
                ? "category-button selected"
                : "category-button"
            }
          >
            Drinks
          </button>
        </section>
        {/* Kolla om listToShow finns, annars sätt en spinner */}
        {listToShow.map((menuItem: Dish) => (
          <div key={menuItem._id} className="meals-card">
            <NavLink
              to={`/menu/${menuItem._id}`}
              className="meals-link"
              onClick={refreshQuantity}
            >
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
            <button
              className="meals-btn"
              onClick={() => handleAddToCart(menuItem._id)}
            >
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
