import { useEffect, useState } from "react"

export default function CustomerStatusOrder() {
    const [waiting, setWaiting] = useState(false)
    const [orderNumber, setOrderNumber] = useState(5123)
    const [timeLeft, setTimeLeft] = useState(20)

    const [timeRemaining, setTimeRemaining] = useState(20 * 60)

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(timeRemaining - 1)
            } else {
                clearInterval(timer);
            }
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [timeRemaining])



    return (
        <>
            <h1> Order: {orderNumber} </h1>

            <h2>ETA: {timeLeft} minutes </h2>
        </>
    )
}