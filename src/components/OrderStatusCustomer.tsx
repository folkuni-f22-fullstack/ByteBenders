import { useEffect, useState, useRef } from "react";
import "../styles/statusorder.css";
import { getKeyFromLS } from "../utils/general";
import { BiSolidTimer } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { orderNumber, isOrdered } from "../components/CartSendDb.jsx";
import { NavLink } from "react-router-dom";
import { isOrderLocked } from "../utils/fetch.js";
import { finishedTime } from "../utils/orderstatus.js";
import { checkIfDishIsFinished } from "../utils/orderstatus.js";
import axios from 'axios'

export default function OrderStatusCustomer() {
    const [count, setCount] = useState(15);
    const [ETA, setETA] = useState(null);
    const [waiting, setWaiting] = useState(true);
    const [lockedOrder, setLockedOrder] = useState(false);
    const orderText = useRef(null);
    const eraseButton = useRef(null);
    const intervalRef = useRef(null);

    // Denna useEffect kollar med 5 sekunders mellanrum om ETA har passerat, har den det så sätter den waiting till false
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            checkIfDishIsFinished(count, setWaiting);
            if (!waiting) {
                clearInterval(intervalRef.current);
            }
        }, 2000);

        return () => clearInterval(intervalRef.current);
    }, [count, waiting]);

    // för knappen "Place new order"
    function handleClick() {
        localStorage.removeItem("order");
        localStorage.removeItem("ETA");
        isOrdered.value = false;
    }

    // för knappen "try"
    async function attemptErase(orderId) {

        try {
            const response = await isOrderLocked(orderId);

            if (response === true) {
                orderText.current.innerText =
                    "Sorry, the order is already being made..";
            } else {
                orderText.current.innerText =
                    "Your order has been erased and you can now make a new order.";

                // RADERA FRÅN LS
                localStorage.removeItem('order')
                localStorage.removeItem('ETA')

                // RADERA FRÅN DB
                axios.delete(`/api/orders/${orderId}`)
                    .then(response => {
                        console.log('Order successfully erased!', response.data);
                    })
                    .catch(error => {
                        console.error('Something went wrong...', error)
                    })
                
            }
        } catch (error) {
            orderText.current.innerText =
                "The order was not found for some reason. Please call us!";
            console.log(error);
        }
    }
  }

    return (
        <div className="CustomerStatusOrder">
            <div className={waiting ? "order-waiting" : "order-finished"}>
                <h1>
                    {" "}
                    Order: <span className="yellow">
                        {" "}
                        {orderNumber.value}{" "}
                    </span>{" "}
                </h1>

                {waiting ? (
                    <BiSolidTimer className="orderstatus-icon waiting" />
                ) : (
                    <AiOutlineCheckCircle className="orderstatus-icon finished" />
                )}

                {waiting ? (
                    <>
                    <h3>
                        Estimated done:{" "}
                        <span className="yellow"> {finishedTime(count)} </span>
                    </h3>
                    <p ref={orderText}>
                        {" "}
                        Try erasing order and start over? <br /> (as long as the
                        order has not been locked) {" "}
                    </p>
                    <button
                        ref={eraseButton}
                        onClick={() => attemptErase(orderNumber.value)}
                    >
                        {" "}
                        Try{" "}
                    </button>
                    </>

                ) : (
                    <>
                        <h3> Enjoy your meal </h3>
                        <NavLink to="/">
                            <button
                                className="place-new-order"
                                onClick={handleClick}
                            >
                                {" "}
                                Place new order{" "}
                            </button>
                        </NavLink>
                    </>
                )}

            </div>
        </div>
    );
}
