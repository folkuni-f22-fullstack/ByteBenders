import { useState } from 'react'
import { RiCheckboxCircleLine } from 'react-icons/ri'
import '../styles/OrderCards.css'
import '../App.css'

export default function DoneOrderCard() {
    const [orderData, setOrderData] = useState({
        orderNumber: 15235,
        orderContent: [
            {
                productName: "California roll 8st",
                amount: 1
            },
            {
                productName: "Pepsi",
                amount: 1
            },
        ]
    })

// todo Koppla faktiskt data från cart till Employee gränssnittet

    return (
        <>
            {/* <h1>Done Orders</h1> */}
            <div className="done-order-card">
                <div className="order-content">
                    <h1> #{orderData.orderNumber} </h1>
                    <ul>
                        {orderData.orderContent.map(product =>
                            <li> {product.productName},
                                <span className="amount-text">x{product.amount}
                                </span>
                            </li>
                        )}
                        <div className='RiCheckboxCircleLine'>
                            <RiCheckboxCircleLine />
                        </div>
                        <h3>Kommentar</h3>
                        <li></li>
                    </ul>
                </div>
            </div>
        </>
    )
}