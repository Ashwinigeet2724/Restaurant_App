import React, { createContext, useEffect, useState } from "react";
import {
  getCartApi,
  addToCartApi,
  updateCartApi,
  clearCartApi,
  removeFromCartApi,
} from "../services/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await getCartApi();
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (foodId) => {
    await addToCartApi(foodId, 1);
    fetchCart();
  };

  const updateQuantity = async (foodId, quantity) => {
    if (quantity <= 0) {
      await removeFromCartApi(foodId);
    } else {
      await updateCartApi(foodId, quantity);
    }
    fetchCart();
  };

  const clearCart = async () => {
    await clearCartApi();
    fetchCart();
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
