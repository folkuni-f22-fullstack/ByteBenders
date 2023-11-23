import { signal } from '@preact/signals-react'
export let orderNumber = signal(null)
export let isOrdered = signal(false)
import { postOrder } from "../utils/fetch.tsx";
import { useRecoilState } from 'recoil';
import { isCartEmptyState } from "../recoil/cartNumberState.js";
import { orderState } from '../recoil/orderState.js'

function SendCartData() {
    const [isCartEmpty, setIsCartEmpty] = useRecoilState(isCartEmptyState);
    const [currentOrder, setCurrentOrder] = useRecoilState(orderState)

    // Ska skicka till LS utöver DB, dessutom ha ett ID
    async function handlePost() {
        let cart = localStorage.getItem('cart')

        if (cart) {
            postOrder()
            
            setCurrentOrder({ 
                isOrdered: true, 
                isWaiting: true, 
                orderNumber: localStorage.getItem('orderNumber') 
            })
            setIsCartEmpty(!isCartEmpty);

            localStorage.removeItem('cart')
            localStorage.removeItem('promo-code')
        }
    }

    return (
        <button className="send-cart-button" onClick={handlePost}>
            Checkout
        </button>
    );
}

export default SendCartData;
