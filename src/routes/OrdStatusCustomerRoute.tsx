import OrderStatusCustomer from "../components/OrderStatusCustomer.tsx"
import '../styles/statusorder.css'
import { NavLink } from "react-router-dom"
import { useState } from "react"

export default function OrdStatusCustomerRoute() {
    const [orderNumber, setOrderNumber] = useState('1')
    // TODO: Behöver riktigt order-nummer
    const [waiting, setWaiting] = useState(true)
    const [count, setCount] = useState(20);
    // antal minuter som ordern tar

    const props = {
        orderNumber,
        setOrderNumber,
        waiting,
        setWaiting,
    }

    return (
        <div className="OrdStatusCustomerRoute">
            <div className="orderstatus-headings">
                <h2> Thank you for ordering! </h2>
                
                <h1> Your order is 
                    {waiting ? ' being made' 
                    : ' ready for pickup'}
                </h1>  
            </div>
            <OrderStatusCustomer props={props} />

            <NavLink to="/"> 
                <button> Back to start </button> 
            </NavLink>
        </div>
    )
}