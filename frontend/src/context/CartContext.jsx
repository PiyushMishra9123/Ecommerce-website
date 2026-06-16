import { createContext, useState, useEffect  } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
const [cartItems, setCartItems] = useState(() => {
  const items = localStorage.getItem("cartItems");
  return items ? JSON.parse(items) : [];
});
useEffect(() => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );
}, [cartItems]);
const addToCart = (product) => {
const existItem = cartItems.find((item) => item._id === product._id);

if (existItem) {
  setCartItems(
    cartItems.map((item) =>
      item._id === product._id
        ? {
            ...item,
            qty: item.qty + 1,
          }
        : item
    )
  );
} else {
  setCartItems([
    ...cartItems,
    {
      ...product,
      qty: 1,
    },
  ]);
}
};

const removeFromCart = (id) => {
  setCartItems(
    cartItems.flatMap((item) => {
      if (item._id !== id) return item;

      if (item.qty > 1) {
        return {
          ...item,
          qty: item.qty - 1,
        };
      }

      return [];
    })
  );
};

return (
<CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
{children}
</CartContext.Provider>
);
}

export default CartProvider;
