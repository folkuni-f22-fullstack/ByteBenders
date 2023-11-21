import CartCard from "../components/CartCard.tsx";
import { isOrdered } from "../components/CartSendDb.jsx";
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil'
import { orderState } from '../recoil/isOrderedState.js'

export default function CartRoute() {
  const [isOrdered, setIsOrdered] = useRecoilState(orderState)
  const [orderFinished, setOrderFinished] = useState(null);

  function checkIfOngoingOrder() {
    localStorage.getItem("isOrdered") ?
      setIsOrdered(true)
      : setIsOrdered(false)
  }

  useEffect(() => {
    checkIfOngoingOrder();
    console.log('isOrdered: ', isOrdered);
    
  }, []);

  return (
    <div className="Cart">
      <CartCard orderFinished={orderFinished} isOrdered={ isOrdered } />
    </div>
  );
}
