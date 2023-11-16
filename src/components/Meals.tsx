import menuData from "../data/menu.json";
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
import axios from "axios";

const Meals = () => {
  const [selectedCategory, setSelectedCartegory] = useState("");
  const [listToShow, setListToShow] = useState<Dish[]>([]);
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartCopy, setCartCopy] = useState([...cartData]);
  const [isCartEmpty, setIsCartEmpty] = useRecoilState(isCartEmptyState);
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    axios.get('http://localhost:1523/api/meals')
      .then(response => setListToShow(response.data))
      .catch(error => console.error('error feching meals', error))
  }, [])

  // Ursprungslistan som skickas med till sök och filter-funktionerna
  const filteredItems: Dish[] = filterByCategory(selectedCategory);

  // Lista med bara rätter, för de ska gå att filtrera, ej dryckerna
  // const allButDrinks = menuData.filter(
  //   (item) => item.category !== "drinks"
  // ) as Dish[];

  const windowWidth = WindowSizeListener();

  // Set value to 1
  function refreshQuantity() {
    quantity.value = 1;
  }

  // Add to local storage
  function handleAddToCart(id: number) {
    addToLS(id);
    setIsCartEmpty(!isCartEmpty);
  }


  return (
    <section className="meals-main">
      <section className="meals-section">
        <section className="searchbar-section">
          {/* <SearchBar
            list={filteredItems}
            // setListToShow={setListToShow}
            setListToShow={(newList) => setListToShow(newList || [])}
            allButDrinks={allButDrinks}
          /> */}
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
