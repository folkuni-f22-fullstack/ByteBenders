import { useEffect, useState, useRef } from "react"
import '../styles/statusorder.css'

export default function OrderStatusCustomer() {
    const [waiting, setWaiting] = useState(true)
    const [orderNumber, setOrderNumber] = useState(5123)

    const timerRef = useRef(null)
    const [count, setCount] = useState(2);

    function startTimer() {
        if (!timerRef.current && count > 0) {
            timerRef.current = setInterval(() => {
                setCount((prevCount) => {
                    const newCount = prevCount - 1
                    if (newCount === 0) {
                        setWaiting(false)
                    }
                    return newCount;
                });
            }, 1000)
        }
    }
    startTimer()

    return (
        <div className="CustomerStatusOrder">
            {waiting ? (
                <div className="order-waiting">
                    <h1> Order: <span className="yellow"> {orderNumber} </span> </h1>
        
                    <p> ... </p>
        
                    <h3> ETA: <span className="yellow"> {count} </span> minutes</h3>
                
                </div>
            ): 
                <div className="order-finished">
                    <h1> Order: <span className="yellow"> {orderNumber} </span> </h1>

                    <p> ... </p>

                    <h3> Enjor your meal </h3>
        
                </div>
            
            
            }
        </div>
    )
}