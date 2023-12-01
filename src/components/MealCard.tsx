import React from "react";
import { NavLink } from "react-router-dom";
import { Dish } from "../interfaces/dish";
import { refreshQuantity } from "../utils/quantityChange";
import { BsCart3 } from "react-icons/bs";
import { motion } from "framer-motion";

type MealCardProps = {
  menuItem: Dish;
  handleAddToCart: (_id: number) => void;
};

const MealCard: React.FC<MealCardProps> = ({ menuItem, handleAddToCart }) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0 }}
    key={menuItem._id} className="meals-card">
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
        <p className="add-cart">Add to cart </p>{" "}
        <BsCart3 className="btn-icon" />
      </button>
    </motion.div>
  );
};

export default MealCard;
