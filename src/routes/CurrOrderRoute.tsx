import CurrentOrderCard from "../components/CurrentOrdersCard";
import '../styles/OrderCards.css'
import { useState } from 'react'

export default function CurrOrderRoute() {
    const [change, setChange] = useState(0)

    return (
        <>
            <br />
            <div className="order-route-header">
                <div className="order-page-employee">
                    <h1> Current Orders </h1>
                    <br />
                </div>
            </div>
            <CurrentOrderCard change={change} setChange={setChange} />
        </>
    );
}
