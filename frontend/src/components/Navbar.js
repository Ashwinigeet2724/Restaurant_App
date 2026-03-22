import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { cart } = useContext(CartContext);

  const totalQty = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <h2 className="logo">Restaurant</h2>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>

        {/* ✅ FIX: Cart is now clickable */}
        <Link to="/cart" className="cart-link">
          Cart
          <span className="cart-badge">{totalQty}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
