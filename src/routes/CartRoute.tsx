import CartCard from "../components/CartCard.tsx";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { orderState } from "../recoil/orderState.js";

export default function CartRoute() {
  const [orderFinished, setOrderFinished] = useState(null);
  const [currentOrder, setCurrentOrder] = useRecoilState(orderState);

  function checkIfOngoingOrder() {
    if (localStorage.getItem("orderNumber")) {
      setCurrentOrder({
        isOrdered: true,
        isWaiting: true,
        orderNumber: localStorage.getItem("orderNumber"),
      });
      return true;
    } else {
      setCurrentOrder({
        isOrdered: false,
        isWaiting: false,
        orderNumber: undefined,
      });
      return false;
    }
  }

  useEffect(() => {
    checkIfOngoingOrder();
  }, []);

  return (
    <div className="Cart">
      <CartCard orderFinished={orderFinished} />
    </div>
  );
}
