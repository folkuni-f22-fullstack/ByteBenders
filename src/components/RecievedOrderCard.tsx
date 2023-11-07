import { useState } from 'react'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import '../styles/OrderCards.css'
import '../App.css'

export default function RecievedOrderCard() {
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
            {/* <h1 >Recieved Orders</h1> */}
            <div className="recieved-order-card">
                <div className="order-content">
                    <h2> #{orderData.orderNumber} </h2>
                    <ul>
                        {orderData.orderContent.map(product =>
                            <li> {product.productName},
                                <span className="amount-text">x{product.amount}
                                </span>
                            </li>
                        )}
                        <div className='BsFillArrowRightCircleFill'>
                            <BsFillArrowRightCircleFill />
                        </div>
                        {/* //todo Koppla kommentar data till span nedan */}
                        <h3>Kommentar</h3>
                        <span>
                            Ingen fisk tack!
                        </span>
                    </ul>
                </div>
            </div>
        </>
    )
}