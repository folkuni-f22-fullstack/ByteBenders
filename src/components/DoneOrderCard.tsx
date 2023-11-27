import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiCheckboxCircleLine } from "react-icons/ri";
import "../styles/OrderCards.css";
import "../App.css";
import { Order } from "../interfaces/order";
import { getOrders } from "../utils/fetch";
import { putOrder } from "../utils/fetch";
import { postDoneOrder } from "../utils/fetch";
import { loginState } from "../recoil/loginState.js";

export default function DoneOrderCard() {
  const [orderData, setOrderData] = useState<Order[] | null>(null);
  const [isExpanded, setIsExpanded] = useState<null | number>(null);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<object>(loginState);

  useEffect(() => {
    async function fetchOrderID() {
      try {
        const fetchedData = await getOrders(isLoggedIn.token);
        const doneOrders = fetchedData?.filter(
          (order) => order.status === "done"
        );
        setOrderData(doneOrders);
        console.log("Succeeded in fetching done orders");
      } catch (error) {
        console.log("Failed to fetch done orders");
      }
    }
    fetchOrderID();
  }, []);

  // todo Koppla faktiskt data från cart till Employee gränssnittet

    if (orderData === null) {
        // Lägg till något laddningsindikator eller annat meddelande medan data hämtas
        return <section className='loading-container'>
            <div className="loading-order">Loading...</div>
        </section>
    }

  const handleOrderDone = async (order: Order) => {
    try {
      await postDoneOrder(order);
      //Skapar en ny array med ordrar, minus den som klickas på.
      setOrderData((prevOrderData) =>
        prevOrderData ? prevOrderData.filter((o) => o._id !== order._id) : null
      );
    } catch (error) {
      console.log("Failed to mark order as done", error);
    }
  };

  const doneOrders = orderData.filter((order) => order.status === "done");

  return (
    <section className="recieved-order-container">
      {doneOrders &&
        doneOrders.map((order) => (
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
            {isExpanded === order._id && (
              <section className="order-info-section">
                <ul className="order-info-list">
                  {order.content.map((item) => (
                    <li className="order-product-name" key={item.name}>
                      {item.name} {item.quantity}x
                    </li>
                  ))}
                </ul>
                <h3 className="order-comment">Comments:</h3>
                <span>{order.usercomment}</span>
                <div
                  className="send-order-icon"
                  onClick={() => handleOrderDone(order)}
                >
                  <RiCheckboxCircleLine />
                </div>
              </section>
            )}
          </div>
        ))}
    </section>
  );
}
