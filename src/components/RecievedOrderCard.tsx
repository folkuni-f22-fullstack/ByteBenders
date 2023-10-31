import { useState } from 'react'
import navArrow from '../assets/arrow_circle_right.png'
import '../styles/RecievedOrderCard.css'

export default function RecievedOrderCard() {
    const [orderNumber, setOrderNumber] = useState(15235);
    // TODO: byt ut mot riktigt ordernummer

    const [orderContent, setOrderContent] = useState(
        // TODO: byt ut mot riktig order-array
        [
            {
                productName: "California roll 8st",
                amount: 1
            }, 
            {
                productName: "Pepsi",
                amount: 1
            }
        ])



    return (
        <div className="RecievedOrderCard">
            <div className="order-content">
                <h1> #{orderNumber} </h1>

                <ul>
                    {orderContent.map(product => 
                        <li> {product.productName}, 
                        <span className="amount-text"> x{product.amount} </span> </li>
                    )}

                </ul>
            </div>

            <img src={navArrow} alt="next-page" />
            {/* TODO: Lägg in routing på navArrow */}

        </div>
    )
}