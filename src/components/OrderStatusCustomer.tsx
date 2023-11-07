import { useEffect, useState, useRef } from "react"
import '../styles/statusorder.css'
import { getKeyFromLS } from "../utils/general"
import { BiSolidTimer } from 'react-icons/bi'
import { AiOutlineCheckCircle } from 'react-icons/ai'

export default function OrderStatusCustomer({ props }) {
    const timerRef = useRef(null)
    const [count, setCount] = useState(20);
    // antal minuter som ordern tar


    // Hämtar ordernumret från LS (som sparas från checkout?)
    function getOrderNumber() {
        let orderNumber = JSON.parse(getKeyFromLS('orderNumber-pending'))
        !orderNumber && (orderNumber = localStorage.setItem('orderNumber-pending', '1'))
        return orderNumber
    }

    // När ordern klar, flytta den i LS, orderNumber-pending -> orderNumber-archived
    function markOrderAsDone() {
        const orderToArchive = JSON.parse(getKeyFromLS('orderNumber-pending'))
        localStorage.setItem('orderNumber-archived', orderToArchive)
        localStorage.removeItem('orderNumber-pending')
    }

    useEffect(() => {
        props.setOrderNumber(getOrderNumber())
    }, [])
    
    function startTimer() {
        if (!timerRef.current && count > 0) {
            timerRef.current = setInterval(() => {
                setCount((prevCount) => {
                    const newCount = prevCount - 1
                    if (newCount === 0) {
                        // när tiden har gått ut
                        props.setWaiting(false)
                        markOrderAsDone()
                    }
                    return newCount;
                });
            }, 1000*60)
        }
    }
    startTimer()

    return (
        <div className="CustomerStatusOrder">
                <div className={props.waiting ? "order-waiting" : "order-finished"}>
                    <h1> Order: <span className="yellow"> {props.orderNumber} </span> </h1>
        
                    {props.waiting ? <BiSolidTimer className="orderstatus-icon waiting"/>
                    : <AiOutlineCheckCircle className="orderstatus-icon finished"/> }
                    
                    {props.waiting ? <h3> ETA: <span className="yellow"> {count} </span> minutes</h3>
                    : <h3> Enjor your meal </h3> }    
                </div>
        </div>
    )
}