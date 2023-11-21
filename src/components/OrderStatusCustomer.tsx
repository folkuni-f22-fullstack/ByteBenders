import { useEffect, useState, useRef } from "react";
import "../styles/statusorder.css";
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
    const [count, setCount] = useState(15);
    const [currentOrder, setCurrentOrder] = useRecoilState(orderState);

    const orderText = useRef(null);
    const eraseButton = useRef(null);
    const intervalRef = useRef(null);

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
                    "Your order has been erased and you can now make a new order.";

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
                        console.log(
                            "Order successfully erased!",
                            response.data
                        );
                    })
                    .catch((error) => {
                        console.error("Something went wrong...", error);
                    });
            }
        } catch (error) {
            orderText.current.innerText =
                "The order was not found for some reason. Please call us!";
            console.log(error);
        }
    }

    return (
        <div>
            {currentOrder.isOrdered && currentOrder.isWaiting && (
                <div className="CustomerStatusOrder">
                    <div className="order-waiting">
                        <h1>
                            Order:{" "}
                            <span className="yellow">
                                {currentOrder.orderNumber}
                            </span>
                        </h1>
                        <BiSolidTimer className="orderstatus-icon waiting" />
                        <>
                            <h3>
                                Estimated done:{" "}
                                <span className="yellow">
                                    {finishedTime(count)}
                                </span>
                            </h3>
                            <p ref={orderText}>
                                Try erasing order and start over? <br /> (as
                                long as the order has not been locked)
                            </p>
                            <button
                                ref={eraseButton}
                                onClick={() =>
                                    attemptErase(currentOrder.orderNumber)
                                }
                            >
                                Try
                            </button>
                        </>
                    </div>
                </div>
            )}
            {currentOrder.isOrdered && !currentOrder.isWaiting && (
                <div className="CustomerStatusOrder">
                    <div className="order-finished">
                        <h1>
                            Order:{" "}
                            <span className="yellow">
                                {currentOrder.orderNumber}
                            </span>
                        </h1>
                        <AiOutlineCheckCircle className="orderstatus-icon finished" />
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
                    </div>
                </div>
            )}
        </div>
    );
}
