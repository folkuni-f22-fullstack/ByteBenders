import { useEffect, useState, useRef } from "react";
import { MdLabelOutline } from "react-icons/md";
import { useRecoilState } from "recoil";
import { DishInCart, Dish } from "../interfaces/dish.ts";
import { getCartQuantity } from "../utils/general.ts";
import SendCartData from "./CartSendDb.tsx";
import { orderState } from "../recoil/orderState.js";
import { cartState } from "../recoil/cartNumberState.js";
import axios from "axios";
import { signal } from "@preact/signals-react";

export let promo = signal(0);
export let totalPrice = signal(0);
function CartInput() {
  const [currentOrder, setCurrentOrder] = useRecoilState(orderState);
  const [cartCopy, setCartCopy] = useState<DishInCart[]>([]);
  const [cartItem, setCartItem] = useState<Dish[]>([]);
  let [isPromo, setIsPromo] = useState("");
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isMailValid, setIsMailValid] = useState(true);
  const [isPromoCorrect, setIsPromoCorrect] = useState(true);
  const customerNameRef = useRef(null);
  const customerMailRef = useRef(null);

  useEffect(() => {
    axios
      .get("/api/meals")
      .then((response) => setCartItem(response.data))
      .catch((error) => console.error("error feching meals", error));
  }, []);

  useEffect(() => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCopy(updatedCart);
    // isCartEmpty toggles from Meals.jsx
  }, [localStorage.getItem("cart")]);

  // Count total price
  function calculateTotalPrice() {
    let total = 0;
    cartCopy.forEach((item) => {
      total += item.total;
    });
    return total;
  }

  // Update promo code
  function handlePromoCodeChange(e) {
    const newPromoCode = e.target.value;
    setIsPromoCorrect(true);
    setIsPromo(newPromoCode);
    localStorage.setItem("promo-code", newPromoCode);
  }

  // Handle dicount
  function promoCode() {
    const storedPromoCode = localStorage.getItem("promo-code") || "";
    setIsPromo(storedPromoCode);

    const storedDiscount = localStorage.getItem("new-price");
    promo.value = JSON.parse(storedDiscount);

    if (storedPromoCode === "discount20%") {
      const discount = Math.round(totalPrice * 0.8);
      promo.value = discount;
      localStorage.setItem("new-price", JSON.stringify(promo.value));
    } else if (isPromo === "") {
      promo.value = 0;
      setIsPromo("");
    } else {
      setIsPromoCorrect(false);
      promo.value = 0;
      setIsPromo("Promo code not correct");
    }
  }

  useEffect(() => {
    promoCode();
  }, []);

  // Update discount and total price
  useEffect(() => {
    totalPrice.value = calculateTotalPrice();
    promoCode();
  }, [cartCopy]);

  useEffect(() => {
    setCartItems(getCartQuantity());
  }, [cartCopy]);

  return (
    <>
      {/* Promo */}
      <div className="cart-promo-container">
        <MdLabelOutline size={20} className="promo-icon" />
        <input
          className={`promo-code ${!isPromoCorrect ? "invalid-promo" : ""}`}
          type="text"
          placeholder="Promo code"
          value={
            !currentOrder.isOrdered && !currentOrder.isWaiting ? isPromo : ""
          }
          onChange={handlePromoCodeChange}
          onClick={() => setIsPromo("")}
        />
        <button className="apply-promo-button" onClick={promoCode}>
          Apply
        </button>
      </div>

      {/* Total price */}
      <div className="cart-total-container">
        <p className="total-text">Total:</p>
        <div className="price">
          {!currentOrder.isOrdered && !currentOrder.isWaiting ? (
            <>
              {promo.value !== 0 && <p className="new-price">{promo} :-</p>}
              <p
                className={
                  promo.value === 0 ? "total-price" : "total-price--crossed"
                }
              >
                {totalPrice} :-
              </p>
            </>
          ) : (
            <>
              <p className="total-price">0 :-</p>
            </>
          )}
        </div>
      </div>

      {/* "First and last name" input field */}
      <div
        className={`userinput-container ${!isNameValid ? "invalid-input" : ""}`}
      >
        <input
          ref={customerNameRef}
          className="user-input"
          id="customer-name"
          type="text"
          placeholder="First and last name"
          onChange={() => setIsNameValid(true)}
        />
      </div>

      {/* "Mail address" input field */}
      <div
        className={`userinput-container ${!isMailValid ? "invalid-input" : ""}`}
      >
        <input
          ref={customerMailRef}
          className="user-input"
          id="customer-mail"
          type="text"
          placeholder="Mail address"
          onChange={() => setIsMailValid(true)}
        />
      </div>

      {/* SendCartData component */}
      <SendCartData
        customerNameRef={customerNameRef}
        customerMailRef={customerMailRef}
        setIsNameValid={setIsNameValid}
        setIsMailValid={setIsMailValid}
      />
    </>
  );
}

export default CartInput;
