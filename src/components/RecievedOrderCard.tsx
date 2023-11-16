import { useState, useEffect } from 'react'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import '../styles/OrderCards.css'
import '../App.css'
import { Order } from '../interfaces/order';
import { getOrders } from '../utils/fetch';


export default function RecievedOrderCard() {
    const [orderData, setOrderData] = useState<Order[] | null>(null)
    const [isExpanded, setIsExpanded] = useState<null | number>(null);

    useEffect(() => {
        async function fetchOrderID() {
            try {
                const fetchedData = await getOrders()
                setOrderData(fetchedData)
                console.log('Succeeded in fetching orders');
            } catch (error) {
                console.log('Failed to fetch orders');
            }
        }
        fetchOrderID()
    }, [])

    // todo Koppla faktiskt data från cart till Employee gränssnittet

    if (orderData === null) {
        // Lägg till något laddningsindikator eller annat meddelande medan data hämtas
        return <div>Loading...</div>;
    }
    

    return (
        <>
            {orderData && orderData.map(order => (
                <div className="recieved-order-card" key={order._id}>
                    <div className="order-content">
                        <h1> <div >{order._id}</div> </h1>
                        <div className="extend-order-icons">
                            {isExpanded ? (
                                <button
                                    onClick={() => setIsExpanded(null)}
                                    className='close-order-icon'>
                                    <IoIosArrowUp />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsExpanded(order._id)}
                                    className='open-order-icon'>
                                    <IoIosArrowDown />
                                </button>
                            )}
                        </div>
                    </div >
                    {isExpanded === order._id && (
                        <ul className='order-info-section'>
                            {order.content.map((item) => (
                                <li className='order-product-name' key={item} >
                                    {item}
                                    <span className="amount-text">: x{order.total}</span>
                                </li>

                            ))}
                            {/* // TODO: Säkertställ att en kommentar renderas beroende av order inte product */}
                            <section className="additional-info-section">
                                <div className='comment-section'>
                                    <h3>Kommentar</h3>
                                    <span >{order.usercomment}</span>
                                </div>
                                <div className='send-order-icon'> <BsFillArrowRightCircleFill />
                                </div>
                            </section>
                        </ul>
                    )
                    }
                </div >
            ))}
        </>
    )
}