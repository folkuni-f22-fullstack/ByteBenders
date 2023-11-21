import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiMinus, BiPlus, BiArrowBack } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { signal } from "@preact/signals-react";
import SendCartData from "./CartSendDb.tsx";
import { cartState } from "../recoil/cartNumberState.js";
import { getCartQuantity } from "../utils/general.ts";
import { useRecoilState } from "recoil";
import { isCartEmptyState } from "../recoil/cartNumberState.js";
import { isOrdered } from "./CartSendDb.js";
import OrderStatusCustomer from "./OrderStatusCustomer.tsx";
import axios from "axios";
import { Dish } from "../interfaces/dish.ts";


export let promo = signal(0);
export let totalPrice = signal(0);
function CartCard() {
  // Get item from local storage
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartCopy, setCartCopy] = useState([...cartData]);
  const [customizeState, setCustomizeState] = useState({});
  let [isPromo, setIsPromo] = useState("");
  const [isCartEmpty, setIsCartEmpty] = useRecoilState(isCartEmptyState);
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [orderFinished, setOrderFinished] = useState(null);
  const [cartItem, setCartItem] = useState<Dish[]>([]);

  useEffect(() => {
    axios.get('/api/meals')
      .then(response => setCartItem(response.data))
      .catch(error => console.error('error feching meals', error))
  }, [])

  // Update cart, !! Utkommenterad pga Infinity Loop !!
  useEffect(() => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCopy([...updatedCart]);
    // isCartEmpty toggles from Meals.jsx
  }, [isCartEmpty]);

  // Quantity count
  const updateCart = [...cartCopy];
  function updateQuantity(index, change) {
    const findItem = cartItem.find(
      (cartItem) => cartItem.name == updateCart[index].name
    );

    // Set counter
    updateCart[index].quantity += change;
    if (change === 1) {
      updateCart[index].total += findItem.price;
    } else if (change === -1) {
      updateCart[index].total -= findItem.price;
    }

    // Remove from local storage when quantity equal 0
    if (updateCart[index].quantity === 0) {
      localStorage.removeItem(updateCart[index].name);
      updateCart.splice(index, 1);
    }

    // Update local storage
    localStorage.setItem("cart", JSON.stringify(updateCart));
    setCartCopy(updateCart);
    numberOfCartItems();
  }

  // Count total price
  function calculateTotalPrice() {
    let total = 0;
    cartCopy.forEach((item) => {
      total += item.total;
    });
    return total;
  }

  // Discount
  function promoCode() {
    if (isPromo === "discount20%") {
      const discount = (totalPrice / 100) * 20;
      const newPrice = Math.round(totalPrice - discount);
      promo.value = newPrice;
    } else if (isPromo === "") {
      promo.value = 0;
    } else {
      promo.value = 0;
    }
  }

  // Update discount and total price
  useEffect(() => {
    totalPrice.value = calculateTotalPrice();
    promoCode();
  }, [cartCopy]);

  // Send customize order to local storage
  function updateComment(name) {
    const updateCartComment = cartCopy.map((item) => {
      if (item.name === name) {
        // Copy of item and update comment property by id. If undifined set empty string as default value.
        return { ...item, usercomment: customizeState[name] || "" };
      }
      return item;
    });
    // Update local storage
    localStorage.setItem("cart", JSON.stringify(updateCartComment));
    setCartCopy(updateCartComment);
  }

  // Recursively counts items in cart
  function numberOfCartItems() {
    let count = 0;
    cartCopy.forEach((item) => {
      count = count + item.quantity;
    });
    return count;
  }

  useEffect(() => {
    setCartItems(getCartQuantity());
  }, [cartCopy]);

  return (
    <>
      <NavLink to="/menu">
        <BiArrowBack className="return-arrow-icon" />
      </NavLink>
      <section className="cart-section">
        <p className="cart-count">{numberOfCartItems()} items in cart</p>
        <div className="cart-card-container">
          {cartCopy.length === 0 ? (
            <div className="empty-cart-div">
              <BsCart3 className="empty-cart-icon" />
              <h2 className="empty-h2">Your cart is empty!</h2>
              <p className="empty-p">
                Looks like you haven't added anything to the cart yet.
              </p>
            </div>
          ) : (
            <>
              {/* Cart */}
              {cartCopy.map((item, index) => (
                <div className="cart-card" key={index}>
                  <NavLink
                    to={`/menu/${item.id}`}
                    className="cart-image-container"
                  >
                    <img className="cart-image" src={item.image} />
                  </NavLink>
                  <NavLink to={`/menu/${item.id}`} className="cart-name">
                    {" "}
                    {item.name}{" "}
                  </NavLink>
                  <p className="sub-text">Lorem ipsum</p>
                  <p className="card-price"> {item.total}:- </p>
                  <div className="amount-container">
                    <button
                      className="sub"
                      onClick={() => updateQuantity(index, -1)}
                    >
                      {" "}
                      <BiMinus className="BiMinus" />
                    </button>
                    <p className="food-amount">{item.quantity} </p>
                    <button
                      className="plus"
                      onClick={() => updateQuantity(index, 1)}
                    >
                      <BiPlus className="BiPlus" />
                    </button>
                  </div>
                  <input
                    className="customize-order"
                    type="text"
                    placeholder={
                      item.usercomment == ""
                        ? "Customize your order +"
                        : item.usercomment
                    }
                    // display data for specific item or empty string
                    value={customizeState[item.name] || ""}
                    onChange={(e) => {
                      const newCustomizeState = { ...customizeState };
                      newCustomizeState[item.name] = e.target.value;
                      setCustomizeState(newCustomizeState);
                    }}
                    onBlur={() => updateComment(item.name)}
                  ></input>
                </div>
              ))}
              {/* orderstatus */}
              {isOrdered.value && !orderFinished && <OrderStatusCustomer />}
            </>
          )}
        </div>
        {/* Promo */}
        <div className="cart-promo-container">
          <MdLabelOutline size={20} className="promo-icon" />
          <input
            className="promo-code"
            type="text"
            placeholder="Promo code"
            onChange={(e) => setIsPromo(e.target.value)}
          />
          <button className="apply-promo-button" onClick={promoCode}>
            Apply
          </button>
        </div>
        {/* Total price */}
        <div className="cart-total-container">
          <p className="total-text">Total:</p>
          <div className="price">
            {promo != 0 && <p className="new-price">{promo}:-</p>}
            <p className={promo == 0 ? "total-price" : "total-price--crossed"}>
              {totalPrice}:-
            </p>
          </div>
        </div>
        <SendCartData />
      </section>
    </>
  );
}

export default CartCard;
