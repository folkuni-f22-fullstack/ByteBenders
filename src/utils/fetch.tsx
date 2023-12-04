import { useParams } from "react-router-dom";
import { Order } from "../interfaces/order";
import { promo, totalPrice } from "../components/CartInput";


// [AJAX-GET] - Specific Meal
export async function getMealsID() {
    const { id } = useParams();
    try {
        const response = await fetch(`/api/meals/${id}`);
        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong while fetching meal details");
    }
}

// [AJAX-GET] - All orders
export async function getOrders(token: any) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    };

    try {
        const response = await fetch(`/api/orders`, options);
        const orderData = await response.json();
        return orderData;
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong while fetching meal details");
    }
}

export async function putOrder(order: Order, newStatus: string, token: any) {
    const putOrderUrl = `/api/orders/${order.orderId}`;
    order.status = newStatus;

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(order),
    };

    try {
        const response = await fetch(putOrderUrl, options);
        const orderData = await response.json();
        return orderData;
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong while fetching meal details");
    }
}

// [AJAX-GET] Specific order
export async function getSpecificOrder(id: any) {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    try {
        const response = await fetch(`/api/customer/${id}`, options);
        const orderData = await response.json();
        return orderData.locked;

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong while fetching meal details");
    }
}

// [AJAX-POST] Order
export async function postOrder(customerInfo: any) {
    const postOrderUrl = "/api/orders";
    const cartData = localStorage.getItem("cart");

    const randomId = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    localStorage.setItem("orderNumber", JSON.stringify(randomId));

    if (!cartData) {
        console.log("Finns ingen orderData i local storage");
        return;
    }

    try {
        const parsedCartData = JSON.parse(cartData);

        // Omstrukturera parsedCartData efter vad din backend förväntar sig
        const formattedOrderData = {
            orderId: randomId,
            date: new Date().toLocaleString("se-SV", {
                timeZone: "Europe/Stockholm",
            }),
            customername: customerInfo.customerName,
            customermail: customerInfo.customerMail,
            content: parsedCartData,
            usercomment: customerInfo.customerComment || "",
            total: promo.value !== 0 ? promo.value : totalPrice.value,
            status: "received",
            locked: parsedCartData.locked || false,
        };

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formattedOrderData),
        };

        const response = await fetch(postOrderUrl, options);

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        // Ta bort orderdatan från local storage efter att beställningen har skickats
        // localStorage.removeItem("cart");
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong while posting order");
    }
}

// [AJAX-DELETE] Order erase
export async function deleteOrder(orderId: string, token: any) {
    try {
        const response = await fetch(`/api/orders/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        if (response.ok) {
            console.log("Order deleted successfully");
        } else if (response.status === 404) {
            console.error("Order not found");
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
}

// [AJAX-POST] Order done
export async function postDoneOrder(order) {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    };

    try {
        const response = await fetch("/api/orders/done", options);
    } catch (error) {
        console.error("Error posting doneOrder:", error);
    }
}

// [AJAX-PUT] Order, update locked
export async function updateLockedOrder(order, type, value) {
    const baseUrl = `/api/editorder/${order.orderId}`;

    let newStaffComment = "";

    (type === "comment" 
    && order.staffcomment 
    && order.staffcomment !== "") ?
        newStaffComment = order.staffcomment + ", " + value

    : (type === "comment") ?
    newStaffComment = value

    : (type === "comment-reset") ?
    newStaffComment = ""

    : newStaffComment = order.staffcomment || "";

    let body = {
        orderId: order.orderId,
        staffcomment: newStaffComment,
        total:
            type === "total" || type === "applyDiscount"
                ? Number(value)
                : order.total,
    };

    try {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };

        let response = await fetch(baseUrl, options);
        return response;
    } catch (error) {
        return error.message;
    }
}
