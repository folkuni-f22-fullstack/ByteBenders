import { signal } from "@preact/signals-react";
import { postOrder } from "../utils/fetch.tsx";
import { useRecoilState } from "recoil";
import { isCartEmptyState } from "../recoil/cartNumberState.js";
import { orderState } from "../recoil/orderState.js";

export let orderNumber = signal(null);
export let isOrdered = signal(false);
function SendCartData({
  customerNameRef,
  customerMailRef,
  customerCommentRef,
  setIsNameValid,
  setIsMailValid,
  setIsComment,

}) {
  const [isCartEmpty, setIsCartEmpty] = useRecoilState(isCartEmptyState);
  const [currentOrder, setCurrentOrder] = useRecoilState(orderState);

  function handlePost() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isMailRegexOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      customerMailRef.current.value
    );
    const isNameRegexOk = /^[a-zA-ZåäöÅÄÖ\- ]+$/.test(
      customerNameRef.current.value
    );

    // For error styling
    isMailRegexOk ? setIsMailValid(true) : setIsMailValid(false);
    isNameRegexOk ? setIsNameValid(true) : setIsNameValid(false);
    setTimeout(() => {
      setIsMailValid(true);
      setIsNameValid(true);
    }, 1500);


    // For function gate keeping
    if (cart.length <= 0) {
      return;
    }
    if (!isMailRegexOk || !isNameRegexOk) {
      return;
    }

    const customerInfo = {
      customerName: customerNameRef.current.value,
      customerMail: customerMailRef.current.value,
      customerComment: customerCommentRef.current.value,
    };

    postOrder(customerInfo);

    setCurrentOrder({
      isOrdered: true,
      isWaiting: true,
      orderNumber: localStorage.getItem("orderNumber"),
    });

    setIsCartEmpty(!isCartEmpty);
    setIsNameValid(true);
    setIsMailValid(true);
    setIsComment(true);
    customerMailRef.current.value = "";
    customerNameRef.current.value = "";
    customerCommentRef.current.value = "";
  }

  return (
    <button className="send-cart-button" onClick={handlePost}>
      Checkout
    </button>
  );
}

export default SendCartData;
