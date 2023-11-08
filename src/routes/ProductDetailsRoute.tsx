import { useParams } from "react-router-dom";
import menuData from "../data/menu.json";
import { useState, useEffect } from "react";
import { BiArrowBack, BiMinus, BiPlus } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import addToLS from "../utils/addCartLS";
import { quantity } from "../utils/addCartLS.tsx";
import "../styles/details.css";

// details code imported and implemented with original

export default function ProductDetailsRoute() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  // let [quantity, setQuantity] = useState(1);

  function findProduct(id) {
    return menuData.find((product) => product.id == id);
  }

  useEffect(() => {
    setProduct(findProduct(id));
  }, [id]);

  // Quantity count
  function updateQuantity(change) {
    // Cannot be less than one
    if (quantity.value >= 1) {
      let newQuantity = quantity.value += change
      newQuantity = Math.max(newQuantity, 1)
      quantity.value = newQuantity
    }
  }

  // Send to local storage
  function handleAddToCart() {
    addToLS(id)
  }

  return (
    <>
      {product && (
        <main className="details-page">
          <div className="back-container">
            <NavLink to="/menu">
              <BiArrowBack className="return-arrow-icon" />
            </NavLink>
          </div>
          <div className="content-container">
            <img
              src={product.image}
              alt={`image of ${product.name}`}
              className="background-img"
            />
            <section className="detail-popup">
              <section className="detail-content">
                <section className="top-row">
                  <div className="amount">
                    <button
                      className="amount-detail-button"
                      onClick={() => updateQuantity(-1)}
                    >
                      <BiMinus className="sub-amount-icon" />
                    </button>
                    <div className="amount-count">{quantity}</div>
                    <button
                      className="amount-detail-button"
                      onClick={() => updateQuantity(1)}
                    >
                      <BiPlus className="add-amount-icon" />
                    </button>
                  </div>
                  <p className="price">{product.price * quantity} :-</p>
                </section>
              </section>
              <div className="description-section">
                <h5 className="detail-header">{product.name}</h5>
                <p className="description-text">{product.description}</p>
              </div>
              <button className="cart-btn" onClick={handleAddToCart}>
                <p className="btn-text">Add to Cart</p>
                <BsCart3 className="add-to-cart-from-details-icon" />
              </button>
            </section>
          </div>
        </main>
      )}
    </>
  );
}
