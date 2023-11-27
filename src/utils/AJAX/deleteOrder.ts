export async function deleteOrder(orderId: number, token) {
    const deleteOrderUrl = `/api/orders/${orderId}`;
  
    try {
      const response = await fetch(deleteOrderUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
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