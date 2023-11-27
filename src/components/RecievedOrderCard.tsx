import { useState, useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useRecoilState } from "recoil";
import { loginState } from '../recoil/loginState.js'
import { deleteOrder } from "../utils/AJAX/deleteOrder.js";

import "../styles/OrderCards.css";
import "../App.css";
import { Order } from "../interfaces/order";
import { getOrders } from "../utils/fetch";
import { putOrder } from "../utils/fetch";

export default function RecievedOrderCard() {
  const [orderData, setOrderData] = useState<Order[] | null>(null);
  const [isExpanded, setIsExpanded] = useState<null | number>(null);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState);

  useEffect(() => {
    async function fetchOrderID() {
      try {
        const fetchedData = await getOrders(isLoggedIn.token);
        const receivedOrders = fetchedData?.filter(
          (order) => order.status === "received"
        );
        setOrderData(receivedOrders);
        console.log("Succeeded in fetching received orders");
      } catch (error) {
        console.log("Failed to fetch received orders");
      }
    }
    fetchOrderID();
  }, []);

  if (orderData === null) {
    return <div>Loading...</div>;
  }

  const handleToggleStatus = async (order: Order, newStatus: string) => {
    try {
      // Update the "status" property in the database
      await putOrder(order, newStatus, isLoggedIn.token);

      // Refetch orders after updating the "status"
      const updatedOrders = await getOrders(isLoggedIn.token);
      setOrderData(updatedOrders);
      console.log("Order updated", updatedOrders);
      // console.log(orderData);
    } catch (error) {
      console.log("Failed to update order status");
    }
  };

  const handleDeleteOrder = async (orderId: number, token) => {
    try { deleteOrder(orderId, token) } 
    catch (error) {console.log('ERROR: ', error);}
    const updatedOrders = await getOrders(token);
    setOrderData(updatedOrders);
  };

  const receivedOrders = orderData.filter(
    (order) => order.status === "received"
  );

    return (
        <section className='recieved-order-container'>
            {receivedOrders && receivedOrders.map(order => (
                <div className="recieved-order-card" key={order.orderId}>
                    <div className="order-content">
                        <h1> <div className='order-id'>{order.orderId}</div> </h1>
                        <div className="extend-order-icons">
                            {isExpanded === order._id ? (
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
                        <section className='order-info-section'>
                          <ul className='order-info-list'>
                                {order.content.map((item) => (
                                    <li className='order-product-name' key={item.name} >
                                        {item.name} {item.quantity}x
                                    </li>
                                ))}
                            </ul>
                            <div className='comment-section'>
                                <h3 className='order-comment'>Comments:</h3>
                                <span >{order.usercomment}</span>
                            </div>
                            <button className='send-order-icon' onClick={() => handleToggleStatus(order, 'current')}> <BsFillArrowRightCircleFill />
                            </button>
                                {!order.locked && (
                                    <button
                                    className='delete-order-icon'
                                    onClick={() => handleDeleteOrder(order._id, isLoggedIn.token)}
                                    ><MdDeleteForever />
                                    </button>
                                )}
                        </section>
                    )
                    }
                </div >
            ))}
        </section>
    )
}
