import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
const { cartItems, removeFromCart } = useContext(CartContext);
const totalPrice = cartItems.reduce(
  (acc, item) =>
    acc + item.price * item.qty,
  0
);
return ( <div className="max-w-6xl mx-auto p-5"> 
<h1 className="text-3xl font-bold mb-5"> Shopping Cart </h1>
{cartItems.map((item) => (
    <div
      key={item._id}
      className="border p-4 mb-3">
      <h2>{item.name}</h2>
      <p>₹{item.price}</p>
      <p>Qty: {item.qty}</p>
      <button onClick={() => removeFromCart(item._id) } className="bg-red-500 text-white px-3 py-1 rounded mt-2">
        Remove</button>
        
    </div>
    
  ))}
  <h2 className="text-2xl font-bold mt-5">Total: ₹{totalPrice}</h2>
</div>

);
}

export default Cart;
