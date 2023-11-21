import CartCard from "../components/CartCard.tsx";
import { isOrdered } from "../components/CartSendDb.jsx";
import { useEffect, useState } from "react";

export default function CartRoute() {
  const [orderFinished, setOrderFinished] = useState(null);

  function checkIfOngoingOrder() {
    if (localStorage.getItem("ETA")) {
      isOrdered.value = localStorage.getItem("ETA");
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
