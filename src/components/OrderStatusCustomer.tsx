import { useEffect, useState, useRef } from "react";
import "../styles/statusorder.css";
import { getKeyFromLS } from "../utils/general";
import { BiSolidTimer } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { orderNumber, isOrdered } from '../components/CartSendDb.jsx'
import { NavLink } from "react-router-dom";

export default function OrderStatusCustomer() {
    const [waiting, setWaiting] = useState(false)
    const [count, setCount] = useState(15);

    function setFinishedTime(count) {

        // Om ingen order redan finns
        if (!localStorage.getItem('ETA')) {
            const currentHour = new Date().getHours()
            const currentMinutes = new Date().getMinutes()
            let newMinutes
            let newHours

            // Om minuter ej slår över
            if (!(currentMinutes + count > 59) ) {
                newHours = currentHour
                newMinutes = currentMinutes + count
                
            } else {
                // Om minuter slår över
                newHours = currentHour + 1
                newMinutes = Math.abs(count - 60).toString()
            }
            
            if (newMinutes.toString().length == 1) {
                newMinutes = '0' + newMinutes
            }
            let ETA = newHours.toString() + ':' + newMinutes.toString()
            localStorage.setItem('ETA', ETA)        
            return ETA
        } else {
            let ETA = localStorage.getItem('ETA')
            return ETA
        }
    }

    useEffect(() => {
        setFinishedTime(count)
        setDishFinished()
    }, [])

    function setDishFinished() {
        let orderTime = setFinishedTime(count)
        let currentDate = new Date()
        let currentMinute = currentDate.getMinutes();
        
        if (orderTime) {
            const orderMinute = Number(orderTime.split(':')[1])
            
            if (orderMinute <= currentMinute) {
                setWaiting(false)
            }
        }
    }

    function handleClick() {
        localStorage.removeItem('order')
        localStorage.removeItem('ETA')
        isOrdered.value = false
    }


    return (
        <div className="CustomerStatusOrder">
            <div className={waiting ? "order-waiting" : "order-finished"}>
                <h1> Order: <span className="yellow"> {orderNumber.value} </span> </h1>

                {waiting ? (
                    <BiSolidTimer className="orderstatus-icon waiting" />
                ) : (
                    <AiOutlineCheckCircle className="orderstatus-icon finished" />
                )}

                {waiting ? (
                        <h3>
                            Färdig kl: <span className="yellow"> {setFinishedTime(count)} </span>
                        </h3>
                ) : (
                    <>
                        <h3> Enjoy your meal </h3>
                        <NavLink to="/">
                            <button className="place-new-order" onClick={handleClick}> Place new order </button>
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
} 