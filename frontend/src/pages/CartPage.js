import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./CartPage.css";

function CartPage() {
  const { cart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.food_item?.price || 0) * Number(item.quantity || 0),
    0
  );

  if (cart.length === 0) {
    return <h2 className="empty-cart">Your cart is empty 🛒</h2>;
  }

  const handleOrder = () => {
    alert("Order placed successfully! 🎉");
    clearCart();
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img
            src={item.food_item?.image || "https://via.placeholder.com/100"}
            alt={item.food_item?.name}
          />

          <div className="cart-details">
            <h4>{item.food_item?.name}</h4>
            <p>₹{Number(item.food_item?.price).toFixed(2)}</p>

            <div className="qty-control">
              <button
                disabled={item.quantity <= 1}
                onClick={() =>
                  updateQuantity(item.food_item.id, item.quantity - 1)
                }
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(item.food_item.id, item.quantity + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* ✅ CART FOOTER */}
      <div className="cart-footer">
        <h3>Total: ₹{total.toFixed(2)}</h3>

        <div className="cart-actions">
          <button className="order-btn" onClick={handleOrder}>
            Place Order
          </button>

          <button className="clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
