import { useState, useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

import "../styles/OrderCards.css";
import "../App.css";
import { Order } from "../interfaces/order";
import { getOrders } from "../utils/fetch";
import { putOrder } from "../utils/fetch";

export default function RecievedOrderCard() {
  const [orderData, setOrderData] = useState<Order[] | null>(null);
  const [isExpanded, setIsExpanded] = useState<null | number>(null);

  useEffect(() => {
    async function fetchOrderID() {
      try {
        const fetchedData = await getOrders();
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
    return <section className='loading-container'>
      <div className="loading-order">Loading...</div>
    </section>
  }

  const handleToggleStatus = async (order: Order, newStatus: string) => {
    try {
      // Update the "status" property in the database
      await putOrder(order, newStatus);

      // Refetch orders after updating the "status"
      const updatedOrders = await getOrders();
      setOrderData(updatedOrders);
      console.log("Order updated", updatedOrders);
      // console.log(orderData);
    } catch (error) {
      console.log("Failed to update order status");
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // You might need to include authentication headers if required
        },
      });

      if (response.ok) {
        console.log("Order deleted successfully");
        // Order deleted successfully, update the order list
        const updatedOrders = await getOrders();
        setOrderData(updatedOrders);
      } else {
        console.error(
          "Failed to delete order:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
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
                  onClick={() => handleDeleteOrder(order._id)}
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
