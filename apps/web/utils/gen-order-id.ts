import axios from "axios";

export async function generateOrderId() {
  try {
    const response = await axios.post("/api/intiate-order");
    console.log("Order Response:", response.data);
    return response.data.orderId;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create order");
  }
}
