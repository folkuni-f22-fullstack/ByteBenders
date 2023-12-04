import { useEffect, useState, useRef } from "react";
import "../styles/statusorder.css";
import { useNavigate } from "react-router-dom";
import { BiSolidTimer } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { isOrderLocked } from "../utils/fetch.js";
import { finishedTime } from "../utils/orderstatus.js";
import { checkIfDishIsFinished } from "../utils/orderstatus.js";
import { orderState } from "../recoil/orderState.js";
import { useRecoilState } from "recoil";
import axios from "axios";

export default function OrderStatusCustomer() {
  const [count, setCount] = useState(0.3);
  const [currentOrder, setCurrentOrder] = useRecoilState(orderState);
  const navigate = useNavigate();

  const orderText = useRef(null);
  const eraseButton = useRef(null);
  const resetButton = useRef(null);
  const intervalRef = useRef(null);
  const ETAtext = useRef(null);

  // Denna useEffect kollar vid mount om order finns
  useEffect(() => {
    checkIfDishIsFinished(count, setCurrentOrder);
  }, []);

  // Denna useEffect kollar med 5 sekunders mellanrum om ETA har passerat, har den det så sätter den waiting till false
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      checkIfDishIsFinished(count, setCurrentOrder);
      if (!currentOrder.isWaiting) {
        clearInterval(intervalRef.current);
      }
    }, 2000);
    return () => clearInterval(intervalRef.current);
  }, [count, currentOrder.isWaiting]);

  // knappen "Place new order"
  function handleClick() {
    localStorage.removeItem("orderNumber");
    localStorage.removeItem("ETA");
    localStorage.removeItem("cart");
    localStorage.removeItem("promo-code")
    setCurrentOrder({ isOrdered: false, isWaiting: false });
  }


  // knappen "try"
  async function attemptErase(orderId) {
    // orderId hämtas från LS, därav parse
    orderId = JSON.parse(orderId);

    try {
      const response = await isOrderLocked(orderId);

      if (response === true) {
        orderText.current.innerText =
          "Sorry, the order is already being made..";
      } else {
        orderText.current.innerText =
          "You can now edit your order.";
        eraseButton.current.style.visibility = "hidden";
        ETAtext.current.style.visibility = "hidden";

        setTimeout(() => {
          setCurrentOrder({
            isOrdered: false,
            isWaiting: false,
            orderNumber: undefined,
          });

          // RADERA FRÅN LS
          localStorage.removeItem("orderNumber");
          localStorage.removeItem("ETA");

          // RADERA FRÅN DATABAS
          axios
            .delete(`/api/customer/${orderId}`)
            .then((response) => {
            })
            .catch((error) => {
            });
        }, 3000);
      }
    } catch (error) {
      orderText.current.innerText =
        "The order was not found for some reason. Call us at 070-432 56 01";
        resetButton.current.style.display = 'block';
        eraseButton.current.style.display = 'none';
    }
  }

  function handleOrderReset () {
    localStorage.clear()
    navigate("/menu");
  }

  return (
    <div>
      {currentOrder.isOrdered && currentOrder.isWaiting && (
        <div className="CustomerStatusOrder">
          <div className="order-waiting">
            <h1>
              Order: <span className="yellow">{currentOrder.orderNumber}</span>
            </h1>
            <BiSolidTimer className="orderstatus-icon waiting" />
            <>
              <h3 ref={ETAtext}>
                Estimated done:{" "}
                <span className="yellow">{finishedTime(count)}</span>
              </h3>
              <p ref={orderText} className="order-text">
                Try to edit your order? <br /> (as long as the order
                has not been locked)
              </p>
              <div className="button-container">
                <button
                  className="orange-button"
                  style={{ display: 'block'}}
                  ref={eraseButton}
                  onClick={() => attemptErase(currentOrder.orderNumber)}
                >
                  Edit order
                </button>
                <button 
                  className="orange-button" 
                  ref={resetButton} 
                  onClick={handleOrderReset}
                  style={{ display: 'none'}
                  }> Start over </button>
              </div>
            </>
          </div>
        </div>
      )}
      {currentOrder.isOrdered && !currentOrder.isWaiting && (
        <div className="CustomerStatusOrder">
          <div className="order-finished">
            <h1>
              Order: <span className="yellow">{currentOrder.orderNumber}</span>
            </h1>
            <AiOutlineCheckCircle className="orderstatus-icon finished" />
            <>
              <h3> Enjoy your meal </h3>
              <NavLink to="/">
                <button className="orange-button" onClick={handleClick}>
                  {" "}
                  Place new order{" "}
                </button>
              </NavLink>
            </>
          </div>
        </div>
      )}
    </div>
  );
}
