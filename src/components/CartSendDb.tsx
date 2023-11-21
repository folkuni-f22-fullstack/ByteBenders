import { promo, totalPrice } from "./CartCard.tsx";
import { randomizer } from "../utils/general";
import { signal } from '@preact/signals-react'
import { postOrder } from "../utils/fetch.tsx";
import { useRecoilState } from 'recoil'
import { orderState } from '../recoil/isOrderedState.js'
export let orderNumber = signal(null)
export let isOrdered = signal(false)

function SendCartData() {
    const [isOrdered, setIsOrdered] = useRecoilState(orderState)
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    // Ska skicka till LS utöver DB, dessutom ha ett ID

    async function handlePost() {
        console.log(orderNumber.value);

        const newOrderNumber = randomizer(0, 99999999999999)
        orderNumber.value = newOrderNumber
        isOrdered.value = true
        
        // Temporary URL until we have a server
        const response = await fetch(`/api/order/`, {
            method: "POST",
            body: JSON.stringify({
                id: randomizer(0, 9999999),
                name: cartData.name,
                total: promo.value !== 0 ? promo.value : totalPrice.value,
                comment: cartData.comment,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Response", response.status);
        console.log("Price with dicount", promo.value);
        console.log("Price without dicount", totalPrice.value);
        console.log(cartData);

        handlePostLS();
		localStorage.removeItem('cart')
    }

    function handlePostLS() {
        let orderCartData = JSON.parse(localStorage.getItem("order")) || []
        // const orderId = randomizer(0, 99999999);

        const order = {
            orderId: orderNumber.value,
            orderItems: [],
        }

        cartData.forEach((element) => {
            const orderItem = {
                id: element.id,
                name: element.name,
                total: promo.value !== 0 ? promo.value : totalPrice.value,
                comment: element.comment,
            };
            order.orderItems.push(orderItem);
        });

        orderCartData.push(order);

        localStorage.setItem("order", JSON.stringify(orderCartData));
    }

    return (
        // Bytte onClick från "handlePost" till "postOrder" för testning // Victor
        <button className="send-cart-button" onClick={() => postOrder(isOrdered, setIsOrdered)}>
            Checkout
        </button>
    );
}

export default SendCartData;
