import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "../recoil/loginState.js";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import "../styles/OrderCards.css";
import "../App.css";
import { Order } from "../interfaces/order";
import { getOrders } from "../utils/fetch";
import { putOrder } from "../utils/fetch";
import { useRef } from "react";
import { GoCheckbox } from "react-icons/go";
import { updateLockedOrder } from "../utils/fetch";

export default function CurrentOrderCard({ change, setChange }) {
  const [orderData, setOrderData] = useState<Order[] | null>(null);
  const [isExpanded, setIsExpanded] = useState<null | number>(null);
  const [priceChange, setPriceChange] = useState(null);
  const [commentChange, setCommentChange] = useState(null);
  const [discountChange, setDiscountChange] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState);
  // const [change, setChange] = useState(false);

  const totalInput = useRef(null);
  const commentInput = useRef(null);
  const discountInput = useRef(null);

  useEffect(() => {
    async function fetchOrderData() {
      try {
        const fetchedData = await getOrders();
        setOrderData(fetchedData);
        console.log("Succeeded in fetching orders");
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    }

    fetchOrderData();
  }, [change]);

  if (orderData === null) {
    // Lägg till något laddningsindikator eller annat meddelande medan data hämtas
    return <div>Loading...</div>;
  }

  const handleToggleStatus = async (order: Order, newStatus: string) => {
    try {
      // Update the "status" property in the database
      await putOrder(order, newStatus, isLoggedIn.token);

      // Refetch orders after updating the "status"
      const updatedOrders = await getOrders(isLoggedIn.token);
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
        const updatedOrders = await getOrders(isLoggedIn.token);
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

  function handleCommentChange(event) {
    const newComment = String(commentInput.current.value);
    setCommentChange(newComment);
  }

  function handlePriceChange(order) {
    const newTotal = Number(totalInput.current.value);
    setPriceChange(newTotal);
  }

  function handleDiscountChange(order) {
    const newTotal = Number(discountInput.current.value);
    setDiscountChange(newTotal);
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

    setChange(change++);
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
                      <div>
                        Total: <span>{order.total}</span> Kr
                      </div>
                    </li>
                  ))}
                </ul>
                {/* RENDER ORDER MEALS END */}

                {/* USER COMMENT SECTION START */}
                <h3 className="order-comment">User commments:</h3>
                <span>{order.usercomment}</span>
                {/* USER COMMENT SECTION END */}
                {/* STAFF COMMENT SECTION START */}
                <h3 className="order-comment">Staff commments:</h3>
                <span>{order.staffcomment}</span>
                {/* STAFF COMMENT SECTION END */}

                <section className="staff-edit-section">
                  {/* EDIT STAFF COMMENT SECTION START */}
                  <div className="input-icon">
                    <input
                      type="text"
                      placeholder="Add comment"
                      ref={commentInput}
                      onChange={() => handleCommentChange()}
                    />
                    <button
                      onClick={() =>
                        sendChange(order, "comment", commentChange)
                      }
                    >
                      <GoCheckbox />
                    </button>
                  </div>
                  {/*  EDIT STAFF COMMENT SECTION END */}

                  {/* DISCOUNT SECTION START */}
                  <div className="input-icon">
                    <input
                      type="text"
                      placeholder="Apply discount"
                      ref={discountInput}
                      onChange={(event) => handleDiscountChange(event)}
                    />
                    <button
                      type="apply discount"
                      onClick={() => calculateNewPrice(order, discountChange)}
                    >
                      <GoCheckbox />
                    </button>
                  </div>
                  {/* DISCOUNT SECTION END */}

                  {/* NEW TOTAL SECTION START */}
                  <div className="input-icon">
                    <input
                      type="text"
                      placeholder="Edit order price"
                      ref={totalInput}
                      onChange={(order) => handlePriceChange(order)}
                    />
                    <button
                      onClick={() => sendChange(order, "total", priceChange)}
                    >
                      <GoCheckbox />
                    </button>
                  </div>
                  {/* NEW TOTAL SECTION END */}
                </section>

                <section className="bottom-handlers-section">
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
              </section>
            )}
          </div>
        ))}
    </section>
  );
}
