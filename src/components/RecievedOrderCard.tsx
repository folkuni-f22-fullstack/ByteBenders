import { useState } from 'react'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
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
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <>
            {/* <h1 >Recieved Orders</h1> */}
            <div className="recieved-order-card">
                <div className="order-content">
                    <h1> #{orderData.orderNumber} </h1>
                    <div onClick={toggleExpansion} className="extend-order-icons">
                        {isExpanded ? (
                            <div className='close-order-icon'>
                                <IoIosArrowUp />
                            </div>
                        ) : (
                            <div className='open-order-icon'>
                                <IoIosArrowDown />
                            </div>
                        )}
                    </div>
                </div>
                {isExpanded && (
                    <ul className='order-info-section'>
                        {orderData.orderContent.map(product => (
                            <li className='order-product-name' key={product.productName}>
                                {product.productName}
                                <span className="amount-text">: x{product.amount}</span>
                            </li>
                        ))}
                        {/* // TODO: Säkertställ att en kommentar renderas beroende av order inte product */}
                        <section className="additional-info-section">
                            <div className='comment-section'>
                                <h3>Kommentar</h3>
                                <span >Ingen Fisk</span>
                            </div>
                            <div className='send-order-icon'> <BsFillArrowRightCircleFill />
                            </div>
                        </section>
                    </ul>
                )}
            </div >
        </>
    )
}