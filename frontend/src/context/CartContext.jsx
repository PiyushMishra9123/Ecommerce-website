import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

function CartProvider({ children }) {
  // Get cart items from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const items = localStorage.getItem("cartItems");

    return items ? JSON.parse(items) : [];
  });

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product) => {
    // Check stock
    if (product.stock <= 0) {
      toast.error("Out Of Stock");
      return;
    }

    // Check if product already exists in cart
    const existItem = cartItems.find(
      (item) => item._id === product._id
    );

    if (existItem) {
      // Check maximum stock limit
      if (existItem.qty >= product.stock) {
        toast.warning(
          `Only ${product.stock} items available`
        );
        return;
      }

      // Increase quantity
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
      // Add new product
      setCartItems([
        ...cartItems,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter(
        (item) => item._id !== id
      )
    );
  };

  // Increase product quantity
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) => {
        if (item._id === id) {
          // Check stock limit
          if (item.qty >= item.stock) {
            toast.warning(
              `Only ${item.stock} items available in stock`
            );
            return item;
          }

          return {
            ...item,
            qty: item.qty + 1,
          };
        }

        return item;
      })
    );
  };

  // Decrease product quantity
  const decreaseQty = (id) => {
    setCartItems(
      cartItems.flatMap((item) => {
        if (item._id !== id) {
          return item;
        }

        // Decrease quantity if greater than 1
        if (item.qty > 1) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        }

        // Remove item if quantity becomes 0
        return [];
      })
    );
  };

  // Total number of items in cart
  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartCount,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;