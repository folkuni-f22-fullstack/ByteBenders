import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiMinus, BiPlus, BiArrowBack } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { cartState } from "../recoil/cartNumberState.js";
import { getCartQuantity } from "../utils/general.ts";
import { useRecoilState } from "recoil";
import OrderStatusCustomer from "./OrderStatusCustomer.tsx";
import axios from "axios";
import { Dish, DishInCart } from "../interfaces/dish.ts";
import { orderState } from "../recoil/orderState.js";
import CartInput from "./CartInput.tsx";

function CartCard() {
  const [cartCopy, setCartCopy] = useState<DishInCart[]>([]);
  const [customizeState, setCustomizeState] = useState({});
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [cartItem, setCartItem] = useState<Dish[]>([]);
  const [currentOrder, setCurrentOrder] = useRecoilState(orderState);

  useEffect(() => {
    axios
      .get("/api/meals")
      .then((response) => setCartItem(response.data))
      .catch((error) => console.error("error feching meals", error));
  }, []);

  // Update cart
  useEffect(() => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCopy(updatedCart);
    // isCartEmpty toggles from Meals.jsx
  }, [localStorage.getItem("cart")]);

  // Quantity count
  const updateCart: DishInCart[] = [...cartCopy];
  function updateQuantity(index: number, change: number) {
    const findItem = cartItem.find(
      (cartItem) => cartItem.name == updateCart[index].name
    );

    // Set counter
    updateCart[index].quantity += change;
    if (change === 1) {
      updateCart[index].total += findItem?.price;
    } else if (change === -1) {
      updateCart[index].total -= findItem?.price;
    }

    // Remove from local storage when quantity equal 0
    if (updateCart[index].quantity === 0) {
      // remove item by index
      const removedItem = updateCart.splice(index, 1)[0];

      // Check if removeItem exist and have a valid name
      if (removedItem && removedItem.name) {
        localStorage.removeItem(removedItem.name);

        // Remove comment from customizeState
        const newCustomizeState = { ...customizeState };
        delete newCustomizeState[removedItem.name];
        setCustomizeState(newCustomizeState);
      }
    }

    // Update local storage
    localStorage.setItem("cart", JSON.stringify(updateCart));
    setCartCopy(updateCart);
    numberOfCartItems();
  }

  // Send customize order to local storage
  function updateComment(name) {
    const updateCartComment = updateCart.map((item) => {
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
          {!currentOrder.isOrdered && !currentOrder.isWaiting && (
            <>
              {cartCopy.length === 0 && !currentOrder.isOrdered ? (
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
                  {cartCopy.map((item: DishInCart, index) => (
                    <div className="cart-card" key={index}>
                      <NavLink
                        to={`/menu/${item._id}`}
                        className="cart-image-container"
                      >
                        <img className="cart-image" src={item.image} />
                      </NavLink>
                      <NavLink
                        key={item._id}
                        to={`/menu/${item._id}`}
                        className="cart-name"
                      >
                        {" "}
                        {item.name}{" "}
                      </NavLink>
                      <p className="card-price"> {item.total} :- </p>
                      <p className="sub-text">Amount: </p>
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
                          item.usercomment === ""
                            ? "Customize your order +"
                            : item.usercomment
                        }
                        // display data for specific item or empty string
                        value={customizeState[item.name] || ""}
                        onChange={(e) => {
                          const newCustomizeState = {
                            ...customizeState,
                          };
                          newCustomizeState[item.name] = e.target.value;
                          setCustomizeState(newCustomizeState);
                        }}
                        onBlur={() => updateComment(item.name)}
                      ></input>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
          {/* orderstatus */}
          {<OrderStatusCustomer />}
        </div>
        <CartInput />
      </section>
    </>
  );
}

export default CartCard;
