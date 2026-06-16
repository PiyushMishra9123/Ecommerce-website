import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
const { cartItems, removeFromCart,increaseQty,decreaseQty, } = useContext(CartContext);
const navigate = useNavigate();

const totalPrice = cartItems.reduce(
  (acc, item) =>
    acc + item.price * item.qty,
  0
);
const handlePlaceOrder = async () => {
  try {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );
    await axios.post(
      "http://localhost:5000/api/orders",
      {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          price: item.price,
          product: item._id,
        })),
        totalPrice,
      },
      {
        headers: {
          authorization: userInfo.token,
        },
      }
    );
    localStorage.removeItem("cartItems");
    alert("Order Placed Successfully");
    navigate("/orders");
  } catch (error) {
    console.log(error);
  }
};
return ( <div className="max-w-6xl mx-auto p-5"> 
<h1 className="text-3xl font-bold mb-5"> Shopping Cart </h1>
{cartItems.map((item) => (
    <div
      key={item._id}
      className="border p-4 mb-3">
      <h2>{item.name}</h2>
      <p>₹{item.price}</p>
      <div className="flex items-center gap-3 mt-2">
  <button
    onClick={() =>
      decreaseQty(item._id)
    }
    className="bg-gray-300 px-3 py-1 rounded">-</button>
  <span>{item.qty}</span>
  <button
    onClick={() =>
      increaseQty(item._id)
    }
    className="bg-gray-300 px-3 py-1 rounded">+</button>
  </div>
      <button onClick={() => removeFromCart(item._id) } className="bg-red-500 text-white px-3 py-1 rounded mt-2">
        Remove</button>
        
    </div>
    
  ))}
  <h2 className="text-2xl font-bold mt-5">Total: ₹{totalPrice}</h2>
  <button onClick={handlePlaceOrder}className="bg-green-600 text-white px-4 py-2 rounded mt-4">Place Order</button>
</div>

);
}

export default Cart;
