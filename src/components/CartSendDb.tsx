import { signal } from '@preact/signals-react'
export let orderNumber = signal(null)
export let isOrdered = signal(false)
import { postOrder } from "../utils/fetch.tsx";
import { useRecoilState } from 'recoil';
import { isCartEmptyState } from "../recoil/cartNumberState.js";

function SendCartData() {
    const [isCartEmpty, setIsCartEmpty] = useRecoilState(isCartEmptyState);

    // Ska skicka till LS utöver DB, dessutom ha ett ID
    async function handlePost() {
        postOrder()
        localStorage.removeItem('cart')
        setIsCartEmpty(!isCartEmpty);
    }

    return (
        <button className="send-cart-button" onClick={handlePost}>
            Checkout
        </button>
    );
}

export default SendCartData;
