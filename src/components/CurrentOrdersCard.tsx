import { useState, useEffect } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import '../styles/OrderCards.css';
import '../App.css';
import { Order } from '../interfaces/order';
import { getOrders } from '../utils/fetch';
import { putOrder } from '../utils/fetch';


export default function CurrentOrderCard() {
    const [orderData, setOrderData] = useState<Order[] | null>(null)
    const [isExpanded, setIsExpanded] = useState<null | number>(null);

    useEffect(() => {
        async function fetchOrderID() {
            try {
                const fetchedData = await getOrders()
                const currentOrders = fetchedData?.filter(order => order.status === 'current');
                setOrderData(currentOrders)
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


    const handleToggleStatus = async (order: Order, newStatus: string) => {
        try {
            // Update the "status" property in the database
            await putOrder(order, newStatus);

            // Refetch orders after updating the "status"
            const updatedOrders = await getOrders();
            setOrderData(updatedOrders);
            console.log('Order updated');

        } catch (error) {
            console.log('Failed to update order status');
        }
    };

    const currentOrders = orderData.filter(order => order.status === 'current');


    return (
        <section className='recieved-order-container'>
            {currentOrders && currentOrders.map(order => (
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
                                    onClick={() => setIsExpanded(order.id)}
                                    className='open-order-icon'>
                                    <IoIosArrowDown />
                                </button>
                            )}
                        </div>
                    </div >
                    {isExpanded === order.id && (
                        <ul className='order-info-section'>
                            {order.content.map((item) => (
                                <li className='order-product-name' key={item} >
                                    {item}
                                    <span className="amount-text">: x{order.total}</span>
                                </li>

                            ))}
                            <section className="additional-info-section">
                                <div className='comment-section'>
                                    <h3>Kommentar</h3>
                                    <span >{order.usercomment}</span>
                                </div>
                                <button className='send-order-icon' onClick={() => handleToggleStatus(order, 'done')}> <BsCheckCircleFill />
                                </button>
                            </section>
                        </ul>
                    )
                    }
                </div >
            ))}
        </section>
    )
}