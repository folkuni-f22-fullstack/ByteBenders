import { useEffect, useState, useRef } from "react"
import '../styles/statusorder.css'
import { getKeyFromLS, setKeyFromLS } from "../utils/general"
import {BiSolidTimer} from 'react-icons/bi'
import {AiOutlineCheckCircle} from 'react-icons/ai'

export default function OrderStatusCustomer() {
    const [orderNumber, setOrderNumber] = useState(null)
    // TODO: Behöver riktigt order-nummer
    const [waiting, setWaiting] = useState(false)

    const timerRef = useRef(null)
    const [count, setCount] = useState(20);


    // Hämtar ordernumret från LS
    function getOrderNumber() {
        let orderNumber = JSON.parse(getKeyFromLS('orderNumber-pending'))

        !orderNumber && (orderNumber = localStorage.setItem('orderNumber-pending', '1'))
        return orderNumber
    }

    // Flyttar order i LS från pågående till arkiverat
    function markOrderAsDone() {
        const orderToArchive = JSON.parse(getKeyFromLS('orderNumber-pending'))
        localStorage.setItem('orderNumber-archived', orderToArchive)
        localStorage.removeItem('orderNumber-pending')
    }

    useEffect(() => {
        setOrderNumber(getOrderNumber())
    }, [])

    function startTimer() {
        if (!timerRef.current && count > 0) {
            timerRef.current = setInterval(() => {
                setCount((prevCount) => {
                    const newCount = prevCount - 1
                    if (newCount === 0) {
                        // när tiden har gått ut
                        setWaiting(false)
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

            {/* <button onClick={() => setWaiting(!waiting) }> Waiting / Not waiting</button> */}
            {/* <button onClick={() => markOrderAsDone() }> Mark order as done </button> */}
            {waiting ? (
                <div className="order-waiting">
                    <h1> Order: <span className="yellow"> {orderNumber} </span> </h1>
        
                    <BiSolidTimer className="orderstatus-icon waiting"/>
        
                    <h3> ETA: <span className="yellow"> {count} </span> minutes</h3>
                
                </div>
            ): 
            <div className="order-finished">
                    <h1> Order: <span className="yellow"> {orderNumber} </span> </h1>

                    <AiOutlineCheckCircle className="orderstatus-icon finished"/>

                    <h3> Enjor your meal </h3>
        
                </div>
            
            
            }
        </div>
    )
}