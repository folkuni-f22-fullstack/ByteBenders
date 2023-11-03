import menuData from "../data/menu.json";
import { NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import "../styles/meals.css";

const Meals = () => {
  return (
    <section className="meals-section">
      {menuData.map((menuItem) => (
        <NavLink
          key={menuItem.id}
          to={`/menu/${menuItem.id}`}
          className="meals-link"
        >
          <div className="meals-card">
            <img
              src={menuItem.image}
              alt={`image of ${menuItem.name}`}
              className="meals-img"
            />
            <div className="meals-text">
              <p>{menuItem.name}</p>
              <p className="meals-price">{menuItem.price} :-</p>
            </div>
            <button className="meals-btn">
              Add to cart <BsCart3 className="btn-icon" />
            </button>
          </div>
        </NavLink>
      ))}
    </section>
  );
};
export default Meals;
