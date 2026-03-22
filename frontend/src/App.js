import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ItemsPage from "./pages/ItemsPage";
import CartPage from "./pages/CartPage";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items/:category" element={<ItemsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
