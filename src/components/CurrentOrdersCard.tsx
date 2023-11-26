import { useState, useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import "../styles/OrderCards.css";
import "../App.css";
import { Order } from "../interfaces/order";
import { getOrders } from "../utils/fetch";
import { putOrder } from "../utils/fetch";
import { useRef } from "react";
import { updateLockedOrder } from "../utils/fetch";

export default function CurrentOrderCard({ change, setChange }) {
  const [orderData, setOrderData] = useState<Order[] | null>(null);
  const [isExpanded, setIsExpanded] = useState<null | number>(null);
  const [priceChange, setPriceChange] = useState(null);
  const [commentChange, setCommentChange] = useState(null);
  const [discountChange, setDiscountChange] = useState(null);
  // const [change, setChange] = useState(false);

  const totalInput = useRef(null);
  const commentInput = useRef(null);
  const discountInput = useRef(null);

  useEffect(() => {
    async function fetchOrderID() {
      try {
        const fetchedData = await getOrders();
        const currentOrders = fetchedData?.filter(
          (order) => order.status === "current"
        );
        setOrderData(currentOrders);
        console.log("Succeeded in fetching current orders");
      } catch (error) {
        console.log("Failed to fetch current orders");
      }
    }
    fetchOrderID();
  }, [change]);



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
      console.log("Order updated");
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

  // Handle new staff comment
  function handleCommentChange(orderId: number, event: React.ChangeEvent<HTMLInputElement>) {
    const newComment = String(event.target.value);
    setCommentChange((prev) => ({ ...prev, [orderId]: newComment }))
  }

  // Handle new price
  function handlePriceChange(orderId: number, event: React.ChangeEvent<HTMLInputElement>) {
    const newTotal = Number(event.target.value);
    setPriceChange((prev) => ({ ...prev, [orderId]: newTotal }))
  }

  // Handle discount
  function handleDiscountChange(orderId: number, event: React.ChangeEvent<HTMLInputElement>) {
    const newDiscount = Number(event.target.value);
    setDiscountChange((prev) => ({ ...prev, [orderId]: newDiscount }))
  }

  async function calculateNewPrice(order, percentage) {
    const newPrice = order.total - (order.total / 100) * percentage;
    await sendChange(order, "total", newPrice);
  }

  async function sendChange(order, type, change) {
    if (change === null || change === "" || change === undefined) {
      return;
    }

    try {
      await updateLockedOrder(order, type, change);
    } catch (error) {
      console.log(error);
    }

    setChange((prevChange) => prevChange + 1)
  }

  const currentOrders = orderData.filter((order) => order.status === "current");

  return (
    <section className="recieved-order-container">
      {currentOrders &&
        currentOrders.map((order) => (
          <div className="recieved-order-card" key={order._id}>
            <div className="order-content">
              <h1>
                {" "}
                <div>{order.orderId}</div>{" "}
              </h1>
              <div className="extend-order-icons">
                {isExpanded === order._id ? (
                  <button
                    onClick={() => setIsExpanded(null)}
                    className="close-order-icon"
                  >
                    <IoIosArrowUp />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsExpanded(order._id)}
                    className="open-order-icon"
                  >
                    <IoIosArrowDown />
                  </button>
                )}
              </div>
            </div>
            {/* RENDER ORDER MEALS START */}
            {isExpanded === order._id && (
              <section className="order-info-section">
                <ul className="order-info-list">
                  {order.content.map((item) => (
                    <li className="order-product-name" key={item.name}>
                      {item.name} {item.quantity}x
                    </li>
                  ))}
                  <hr className="linebreak-current" />
                </ul>
                {/* RENDER ORDER MEALS END */}

                {/* USER COMMENT SECTION START */}
                <div className='user-comment-section'>
                  <p className="order-comment">User commments:</p>
                  <span className="user-comment">{order.usercomment}</span>
                </div>
                {/* USER COMMENT SECTION END */}
                {/* STAFF COMMENT SECTION START */}
                <div className='staff-comment-section'>
                  <p className="order-staff-comment">Staff commments:</p>
                  <span className="staff-comment">{order.staffcomment}</span>
                </div>
                {/* STAFF COMMENT SECTION END */}

                <section className="staff-edit-section">
                  {/* EDIT STAFF COMMENT SECTION START */}
                  <div className="input-icon">
                    <input
                      className="edit-current-input edit-current-desktop"
                      type="text"
                      placeholder="Add comment"
                      ref={commentInput}
                      onChange={(event) => handleCommentChange(order._id, event)}
                      onBlur={() => sendChange(order, "comment", commentChange[order._id])}
                    />
                  </div>
                  {/*  EDIT STAFF COMMENT SECTION END */}

                  {/* DISCOUNT SECTION START */}
                  <div className="input-icon">
                    <input
                      className="edit-current-input"
                      type="text"
                      placeholder="Apply discount"
                      ref={discountInput}
                      onChange={(event) => handleDiscountChange(order._id, event)}
                      onBlur={() => calculateNewPrice(order, discountChange[order._id])}
                    />
                  </div>
                  {/* DISCOUNT SECTION END */}

                  {/* NEW TOTAL SECTION START */}
                  <div className="input-icon">
                    <input
                      className="edit-current-input"
                      type="text"
                      placeholder="Edit order price"
                      ref={totalInput}
                      onChange={(event) => handlePriceChange(order._id, event)}
                      onBlur={() => sendChange(order, "total", priceChange[order._id])}
                    />
                  </div>
                  {/* NEW TOTAL SECTION END */}
                </section>

                {order.content.map((item) => (
                  <div className=' current-price' key={item.name}>
                    Total: <span>{order.total}</span> Kr
                  </div>
                ))}

                {/* SEND ORDER START */}
                <button
                  className="send-order-icon"
                  onClick={() => handleToggleStatus(order, "done")}
                >
                  <BsCheckCircleFill />
                </button>
                {/* SEND ORDER END */}

                {/* DELETE ORDER START */}
                <button
                  className="delete-order-icon"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  <MdDeleteForever />
                </button>
                {/* DELETE ORDER END */}
              </section>
            )}
          </div>
        ))
      }
    </section >
  );
}
